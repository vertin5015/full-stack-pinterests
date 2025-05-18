import Pin from "../models/pin.model.js";
import Imagekit from "imagekit";
import Like from "../models/like.model.js";
import Save from "../models/save.model.js";
import Board from "../models/board.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const { search, userId, boardId } = req.query;
  const LIMIT = 15;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: [search] } },
          ],
        }
      : userId
      ? { user: userId }
      : boardId
      ? { board: boardId }
      : {}
  )
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;

  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

export const getPin = async (req, res) => {
  const { id } = req.params;

  const pin = await Pin.findById(id).populate(
    "user",
    "username img displayName"
  );

  res.status(200).json(pin);
};

export const createPin = async (req, res) => {
  const { title, description, link, tags, newBoard } = req.body;

  const media = req.files.media;
  if (!title || !description || !media) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log(title, description, link, tags);

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "test",
    })
    .then(async (response) => {

      let newBoardId;

      if (newBoard) {
        const res = await Board.create({
          title: newBoard,
          user: req.userId,
        });
        newBoardId = res._id;
      }

      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: newBoardId || board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ likeCount, isLiked: false, isSaved: false });
    }

    const userId = payload.userId;

    const isLiked = await Like.findOne({
      user: userId,
      pin: id,
    });

    const isSaved = await Save.findOne({
      user: userId,
      pin: id,
    });

    return res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await Like.findOne({
      pin: id,
      user: req.userId,
    });

    if (isLiked) {
      await Like.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Like.create({
        pin: id,
        user: req.userId,
      });
    }
  } else {
    const isSaved = await Save.findOne({
      pin: id,
      user: req.userId,
    });

    if (isSaved) {
      await Save.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Save.create({
        pin: id,
        user: req.userId,
      });
    }
  }

  return res.status(200).json({ message: "Successful!" });
};

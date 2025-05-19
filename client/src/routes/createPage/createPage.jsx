import "./createPage.css";
import IKImage from "../../components/image/image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import throttle from "lodash/throttle";
import BoardForm from "./BoardForm";

// 定义添加帖子的异步函数，使用 apiRequest 发送 POST 请求
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const { currentUser } = useAuthStore(); // 获取当前用户信息
  const navigate = useNavigate(); // 用于页面导航
  const formRef = useRef(); // 用于引用表单

  const [file, setFile] = useState(null); // 存储上传的文件
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  }); // 图片预览信息
  const [newBoard, setNewBoard] = useState(""); // 新建 board 的名称
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false); // 控制新建 board 表单的显示

  // 检查用户是否登录，未登录则跳转到认证页面
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  // 当文件上传时，生成图片预览
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  // 使用 useMutation 处理表单提交
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      navigate(`/pin/${data._id}`); // 跳转到新创建的 Pin 页面
    },
  });

  const throttledSubmit = throttle(() => {
    const formData = new FormData(formRef.current);
    formData.append("media", file);
    formData.append("newBoard", newBoard);
    mutation.mutate(formData);
  }, 2000); // 节流间隔 2 秒

  // 获取现有 board 列表
  const { data, isPending, error } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () => {
      if (!currentUser?._id) return [];
      return apiRequest
        .get(`/boards/${currentUser._id}`)
        .then((res) => res.data);
    },
  });

  // 切换新建 board 表单的显示状态
  const handleNewBoard = () => {
    setIsNewBoardOpen((prev) => !prev);
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button onClick={throttledSubmit}>Publish</button>
      </div>
      <div className="createBottom">
        {previewImg.url ? (
          <div className="preview">
            <img src={previewImg.url} alt="" />
          </div>
        ) : (
          <>
            <label htmlFor="file" className="upload">
              <div className="uploadTitle">
                <IKImage path="/general/upload.svg" alt="" />
                <span>Choose a file</span>
              </div>
              <div className="uploadInfo">
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </div>
            </label>
            <input
              type="file"
              id="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
        )}
        <form className="createForm" ref={formRef}>
          <div className="createFormItem">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Add a title"
              name="title"
              id="title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="description">Description</label>
            <textarea
              rows={6}
              placeholder="Add a detailed description"
              name="description"
              id="description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="link">Link</label>
            <input type="text" placeholder="Add a link" name="link" id="link" />
            <small>Don&apos;t worry, people won&apos;t see your tags</small>
          </div>
          {(!isPending || !error) && (
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                {data?.map((board) => (
                  <option value={board._id} key={board._id}>
                    {board.title}
                  </option>
                ))}
              </select>
              <div className="newBoard">
                {newBoard && (
                  <div className="newBoardContainer">
                    <div className="newBoardItem">{newBoard}</div>
                  </div>
                )}
                <div className="createBoardButton" onClick={handleNewBoard}>
                  Create new board
                </div>
              </div>
            </div>
          )}
          <div className="createFormItem">
            <label htmlFor="tags">Tagged topics</label>
            <input type="text" placeholder="Add tags" name="tags" id="tags" />
          </div>
        </form>
        {isNewBoardOpen && (
          <BoardForm
            setIsNewBoardOpen={setIsNewBoardOpen}
            setNewBoard={setNewBoard}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePage;

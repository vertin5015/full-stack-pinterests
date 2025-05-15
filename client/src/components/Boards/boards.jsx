import "./boards.css";
import Image from "../image/image";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { format } from "timeago.js";
import { Link } from "react-router";

function Boards({ userId }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className="collections">
      {data?.map((board) => (
        <Link to={`search?boardId=${board._id}`} className="collection" key={board._id}>
          <Image src={board.firstPin.media} alt="" />
          <div className="collectionsInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins · {format(board.createedAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Boards;

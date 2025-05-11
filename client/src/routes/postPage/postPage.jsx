import { Link } from "react-router";
import Image from "../../components/image/image";
import PostInteractions from "../../components/postInteractions/postInteractions";
import "./postPage.css";
import Comments from "../../components/comments/comments";

function PostPage() {
  return (
    <div className="postPage">
      <div className="postContainer">
        <div className="postImg">
          <Image path="pins/pin1.jpeg" alt="" w={735} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to="/john" className="postUser">
            <Image path=".general/noAvatar.png" />
            <span>John Doe</span>
          </Link>
          <Comments/>
        </div>
      </div>
    </div>
  );
}

export default PostPage;

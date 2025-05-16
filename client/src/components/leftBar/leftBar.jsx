import { Link } from "react-router";
import "./leftBar.css";
import Image from "../image/image";

function LeftBar() {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" />
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <Image path="/general/messages.svg" />
      </Link>
    </div>
  );
}

export default LeftBar;

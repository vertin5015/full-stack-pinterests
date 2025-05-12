import { Link } from "react-router";
import "./leftBar.css";

function LeftBar() {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <img src="/general/logo.png" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <img src="/general/home.svg" />
        </Link>
        <Link to="/create" className="menuIcon">
          <img src="/general/create.svg" />
        </Link>
        <Link to="/" className="menuIcon">
          <img src="/general/updates.svg" />
        </Link>
        <Link to="/" className="menuIcon">
          <img src="/general/messages.svg" />
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <img src="/general/messages.svg" />
      </Link>
    </div>
  );
}

export default LeftBar;

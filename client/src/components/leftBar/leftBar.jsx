import "./leftBar.css";

function LeftBar() {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <a href="/" className="menuIcon">
          <img src="/general/logo.png" className="logo" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/home.svg" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/create.svg" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/updates.svg" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/messages.svg" />
        </a>
      </div>
      <a href="/" className="menuIcon">
        <img src="/general/messages.svg" />
      </a>
    </div>
  );
}

export default LeftBar;

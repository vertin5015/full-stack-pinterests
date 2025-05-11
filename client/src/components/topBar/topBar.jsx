import "./topBar.css";
import UserButton from "../userButton/userButton";

function TopBar() {
  return (
    <div className="topBar">
      {/* SEARCH */}
      <div className="search">
        <img src="/general/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </div>
      <UserButton />
    </div>
  );
}

export default TopBar;

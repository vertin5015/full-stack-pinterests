import { useNavigate } from "react-router";
import "./topBar.css";
import Image from "../image/image";
import UserButton from "../userButton/userButton";

function TopBar() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };

  return (
    <div className="topBar">
      {/* SEARCH */}
      <form onSubmit={handleSubmit} className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </form>
      <UserButton />
    </div>
  );
}

export default TopBar;

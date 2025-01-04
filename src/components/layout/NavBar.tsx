import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-400 m-0 py-2 px-10">
      <h2 className="text-3xl">Adventure</h2>
      <div className="flex gap-3">
        <Link to="/home">Home</Link>
        <p> | </p>
        <Link to="/">Tasks</Link>
        <p> | </p>
        <Link to="/users">Users</Link>
        <p> | </p>
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default NavBar;

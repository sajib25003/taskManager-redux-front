import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-gray-400 m-0 py-2 px-10">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" className="h-10 w-10"/>
      <h2 className="text-3xl">Task Management</h2>
      </div>
      <div className="flex gap-3 items-center">
        {/* <Link to="/home">Home</Link>
        <p> | </p> */}
        <Link to="/">Tasks</Link>
        <p> | </p>
        <Link to="/users">Users</Link>
        <p> | </p>
        <Button className="bg-black text-white py-1 px-2 rounded-lg" onClick={handleLogout}>Log Out</Button>

        <ModeToggle/>
      </div>
    </nav>
  );
};

export default NavBar;

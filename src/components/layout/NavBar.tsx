import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  let userName;

  // console.log(token);

  if (token) {
    const decoded = jwtDecode<{ username: string }>(token);

    // console.log(decoded, "decoded");
    userName = decoded.username;
  }

  const showLogoutButton = !["/login", "/register"].includes(location.pathname);

  return (
    <nav className="flex  justify-between items-center bg-gray-400 m-0 py-2 px-2 md:px-10 gap-2">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" className="h-6 md:h-10 w-6 md:w-10" />
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Task Management</h2>
      </div>
      <div className="flex gap-3 items-center justify-end ">
        {/* <Link to="/home">Home</Link>
        <p> | </p> */}
        {/* <Link to="/">Tasks</Link> */}
        {/* <p> | </p> */}
        {/* <Link to="/users">Users</Link>
        <p> | </p> */}
        <p className="hidden md:flex font-bold text-blue-900">{userName || ""}</p>
        {showLogoutButton && (
          <Button
            className="bg-black text-white py-1 px-2 rounded-lg"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;

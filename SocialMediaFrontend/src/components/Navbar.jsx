import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


function Navbar({title, token, setToken}) {
    const navigate = useNavigate();
    // const token = localStorage.getItem("token");
   

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);        
        navigate("/login");
    };

    return (
        <nav>
            <h2>{title}</h2>
            
            <div>
          <Link to="/">Home</Link>

          {token ? (
           <>
          <Link to="/profile">Profile</Link>
           <button onClick={handleLogout}>Logout</button>
           </>
         ) : (
        <>
           <Link to="/login">Login</Link>
           <Link to="/register">Register</Link>
        </>
)}
            
            </div>
        </nav>
    )
}

export default Navbar;
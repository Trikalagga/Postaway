import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useState} from "react";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
    <Navbar title="Postaway" 
    token = {token} setToken={setToken}
    />

    <Routes>
      <Route path="/" element={<Home setToken={setToken} />} />
      <Route path="/profile" element={<Profile />}/>
      <Route path="/login" element = {<Login setToken={setToken} />} />
      <Route path="/register" element = {<Register/>}/>
      
    </Routes>
    </BrowserRouter>
   
  )
}

export default App;
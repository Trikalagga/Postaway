import {useState} from "react";
import {useLocation} from "react-router-dom";

function Login({setToken}) {
    const location = useLocation();
    const sessionMessage = location.state?.message;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(){
        const loginData = {
            email: email,
            password: password
        };
        
        const response = await fetch("http://localhost:3200/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
        } else {
            setErrorMessage(data.message || "Login failed. Please try again.");
        }
       
    }
    
    return (

        <div>
            <h2>Login to Postaway</h2>
            {errorMessage && <p>{errorMessage}</p>}
            
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange = {(event)=>setEmail(event.target.value)}            
            />

            <input 
            type = "password" 
            placeholder="Password"
            value={password}
            onChange={(event)=> setPassword(event.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            {sessionMessage && <p>{sessionMessage}</p>}
        </div>
    );
}

export default Login;
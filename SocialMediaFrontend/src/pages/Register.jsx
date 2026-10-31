import "./Register.css";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
    if (!message) {
        return;
    }

    const timer = setTimeout(() => {
        setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
}, [message]);

    async function handleRegister() {
        const userData = {
            name: name,
            email: email,
            password: password
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        

        const data = await response.json();
        
        
       if (response.ok) {
       navigate("/login", {
        state: {
            message: "You're in, mate! 🎉 Now hurry up, log in, and off you go posting!"
        }
       });
       } else {
       setMessage(data.message);
}
    }


    return (
    <div className="auth-container">
        <div className="auth-card">
            <h2>Create your Postaway account</h2>

            {message && (
                <p className="error-message">{message}</p>
            )}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
        </div>
    </div>
);
}

export default Register;
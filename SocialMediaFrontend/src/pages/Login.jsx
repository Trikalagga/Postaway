import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./Login.css";

function Login({setToken}) {
    const location = useLocation();
    const navigate = useNavigate();
    const sessionMessage = location.state?.message;
    const [statusMessage, setStatusMessage] = useState(sessionMessage || "");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    if (!errorMessage) {
        return;
    }

    const timer = setTimeout(() => {
        setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
}, [errorMessage]);



    useEffect(() => {
        if (!statusMessage) {
            return;
        }

        const timer = setTimeout(() => {
            setStatusMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [statusMessage]);

    async function handleLogin(){
        const loginData = {
            email: email,
            password: password
        };
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
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

    navigate("/profile", {
        state: { message: "Logged in successfully!" },
        replace: true
    });
} else {
    setErrorMessage(data.message || "Login failed. Please try again.");
}

       
    }
    
    return (
    <div className="auth-container">
        <div className="auth-card">
            <h2>Login to Postaway</h2>

            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}

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

            <button onClick={handleLogin}>Login</button>

            {statusMessage && (
                <p className="success-message">{statusMessage}</p>
            )}
        </div>
    </div>
);
}

export default Login;
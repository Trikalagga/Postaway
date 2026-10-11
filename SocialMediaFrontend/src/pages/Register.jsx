import {useState} from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    

    async function handleRegister() {
        const userData = {
            name: name,
            email: email,
            password: password
        };

        const response = await fetch("http://localhost:3200/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        

        const data = await response.json();
        
        
        if (response.ok) {
            setMessage(data.message);
        } else {
            setMessage(data.message);
        }

    }


    return (
        <div>
            <h2>Create your Postaway account</h2>

            <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(event)=>setName(event.target.value)}
            />
           
            <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange = {(event)=>setEmail(event.target.value)}
            />
            
            <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            />
            
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
}

export default Register;
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({setToken}) {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        const response = await fetch("http://localhost:3200/api/posts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.status === 401) {
            localStorage.removeItem("token");
            setToken(null);
            setPosts([]);
            navigate("/login", {
                state: {message: "Your session has expired. Please log in again."}
            });
            return;
        }

        if (response.ok) {
            setPosts(data.posts);
        } else {
            setPosts([]);
        }
    };

    fetchPosts();
}, []);    

    const handleSubmit = async () => {
        
if (!message.trim()) {
    setStatusMessage("Please enter a message before submitting.");
    return;
}

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3200/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({message: message})
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setStatusMessage(data.message);
            setPosts([...posts, data.posts]);
            setMessage("");

        } else {
            setStatusMessage(data.message || "Failed to create post.");
        }
    };

    const handleDelete = async (postId) => {
        const token = localStorage.getItem("token");
        const response = await fetch (
            `http://localhost:3200/api/posts/${postId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await response.json();
        if (response.ok) {
            setPosts(posts.filter((post)=> post._id !== postId));
        }
    };

    


    return (
        <div className="post-form">
            <h2>Welcome to Postaway Home</h2>

            <textarea
                placeholder = "What's on your mind?"
                value = {message}
                onChange = {(event)=> setMessage(event.target.value)}
            />

            <button onClick={handleSubmit}>Submit Post</button>
            {statusMessage && 
            <p className="status-message">{statusMessage}</p>}

            <div className="posts-list">
                <h3>Recent Posts</h3>

                
{posts.map((post) => (
    <div className="post-card" key={post._id}>
        <p className="post-message">{post.message}</p>

        <button onClick={() => handleDelete(post._id)}>
            Delete
        </button>
    </div>
))}


            </div>
            
        </div>
        
    );
}

export default Home;
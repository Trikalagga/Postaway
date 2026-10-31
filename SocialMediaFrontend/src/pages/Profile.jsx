import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";

function Profile () {
    const location = useLocation();
    const successMessage = location.state?.message;

    const [statusMessage, setStatusMessage] = useState(successMessage || "");
    const [user, setUser] = useState(null);
    const [posts,setPosts] = useState([]);

    useEffect(()=> {
        console.log("Profile useEffect is running.");
        const getProfile = async () => {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Profile response:", response.status);

            const data = await response.json();
            console.log("Profile data:",data);
            setUser(data.user);
            console.log("User state: ", data);
        };
        getProfile();

    }, []);


    useEffect(() => {
    const getMyPosts = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts/mine`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            setPosts(data.posts);
        }
    };

    getMyPosts();
}, []);

    
useEffect(() => {
    if (!statusMessage) {
        return;
    }

    const timer = setTimeout(() => {
        setStatusMessage("");
    }, 5000);

    return () => clearTimeout(timer);
}, [statusMessage]);


    return (
        <div>
         {statusMessage && (
        <p
            role="status"
            style={{
                backgroundColor: "#d4edda",
                color: "#155724",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px"
            }}
        >
            {statusMessage}
        </p>
    )}
        <h2>Profile</h2>
        {user && (
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        )}

        <h3>My Posts</h3>

{posts.length === 0 ? (
    <p>You haven't created any posts yet, mate!</p>
) : (
    <div className="my-posts-list">
    {posts.map((post) => (
        <div className="my-post-card" key={post._id}>
            <p className="my-post-message">{post.message}</p>

            <small className="my-post-date">
                {new Date(post.createdAt).toLocaleString()}
            </small>
        </div>
    ))}
</div>
)}




        </div>
    );
}

export default Profile;
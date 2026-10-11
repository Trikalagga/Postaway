import {useState, useEffect} from "react";


function Profile () {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        console.log("Profile useEffect is running.");
        const getProfile = async () => {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            const response = await fetch("http://localhost:3200/api/users/profile", {
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

    return (
        <div>
        <h2>Profile</h2>
        {user && (
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        )}
        </div>
    );
}

export default Profile;
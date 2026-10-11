import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name|| !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch(error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};


export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    

    return res.status(200).json({
        message: "Login successful",
        token
    });
};

export const getProfile = async (req, res) => {
    const user = await User.findById(req.userId).select("-password");

    res.status(200).json({
        user
    });
};
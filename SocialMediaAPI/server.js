import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Postaway API is working!");
// });

app.get("/", (req,res) => {
  console.log("GET / was received");
  res.send("Postaway API is working!");
})

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 3200;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

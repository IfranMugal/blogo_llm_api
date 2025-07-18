// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { generateBlog } from "./generateBlog.js";
import { reviewBlog } from "./reviewBlog.js";
import { moderateBlog } from "./moderateBlog.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const topic = req.body.topic;
  const result = await generateBlog(topic);
  res.json({ result });
});

app.post("/review", async (req, res) => {
  const { blogText } = req.body;
  const result = await reviewBlog(blogText);
  res.json({ result });
});

app.post("/moderate", async (req, res) => {
  const { blogText } = req.body;
  const result = await moderateBlog(blogText);
  res.json(result);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

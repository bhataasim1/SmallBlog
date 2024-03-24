import express from "express";
import userRoutes from "./routes/User.routes.js";
import postRoutes from "./routes/Post.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

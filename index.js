import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import router from "./src/routers/index.js";
import { handleNotFoundError } from "./src/utils/httpResponses.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((_, res) => {
  handleNotFoundError(res);
});

await connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

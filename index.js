import express from "express";
import router from "./src/routes/api.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", router);

await connectDB();
app.listen(3000, () => {});

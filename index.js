import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import router from "./src/routers/index.js";
import handleRes from "./src/utils/handleRes.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());

//route
app.use("/api", router);

//middleware
app.use((_, res) => {
  handleRes.handleNotFoundError(res);
});

//connect to db
await connectDB();

//start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express from "express";
import { router } from "./Router/router.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// DO NOT TOUCH THIS WHY ARE YOU TOUCHING THIS
const PORT = process.env.PORT;
// STOP TOUCHING NO TOUCHY
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

export default app;

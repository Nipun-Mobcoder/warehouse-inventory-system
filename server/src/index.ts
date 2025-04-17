import express from "express";
import "dotenv/config";
import router from "./routes";
import connectDB from "./utils/connectDB";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

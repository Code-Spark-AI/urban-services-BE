import express from "express";
import cors from "cors";
import UserRouetr from "./Routes/UserRoute.js";
import morgan from "morgan";

// Create an Express App
const app = express();

// Configure middleware for the Express application
app.use(express.json({ limit: "2048kb" }));
app.use(cors());
app.use(morgan());

// routes

app.use("/api/v1/user", UserRouetr);

// Start Server
export const RunServer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const port = process.env.PORT || 8000;

      const server = app.listen(port, () => {
        console.log(`Server Running At Port ${port}. http://localhost:${port}`);
        resolve(server);
      });

      server.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

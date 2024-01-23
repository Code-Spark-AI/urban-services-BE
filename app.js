import express from "express";
import cors from "cors";
import UserRouetr from "./Routes/UserRoute.js";
import LocationRouter from "./Routes/LocationRoute.js";
import CategoryRouter from "./Routes/CategoryRoutes.js";
import SubCategoryRouter from "./Routes/SubcategoryRoute.js";
import ServiceRouter from "./Routes/ServiceRoute.js";
import morgan from "morgan";

// Create an Express App
const app = express();

// Configure middleware for the Express application
app.use(express.json({ limit: "2048kb" }));
app.use(cors());
app.use(morgan());

// routes

// UserRouetr

app.use("/api/v1/user", UserRouetr);

// LocationRouter

app.use("/api/v1/Location", LocationRouter);

// CategoryRouter

app.use("/api/v1/Category", CategoryRouter);

// SubCategoryRouter

app.use("/api/v1/subCategory", SubCategoryRouter);

// ServiceRouter

app.use("/api/v1/service", ServiceRouter);

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

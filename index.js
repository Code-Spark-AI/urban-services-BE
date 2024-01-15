import dotenv from "dotenv";
import { DBConnect } from "./DB/DBConnect.js";
import { RunServer } from "./app.js";

dotenv.config();

const ServiceApi = async () => {
  try {
    await DBConnect();
    await RunServer();
    console.log(`ServiceApi Is Running and Ready To Use.`);
  } catch (error) {
    console.log(error);
  }
};

ServiceApi();

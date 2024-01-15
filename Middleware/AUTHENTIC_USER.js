import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
const AUTHENTICATE_USER = async (req, res, next) => {
  const authToken = req.headers.Authorization;
  try {
    const info = jwt.verify(authToken, process.env.JWT_SECRET);
    if (info) {
      const user = await User.findOne({ userName: info.userName });
      user.authToken = authToken;
      req.user = user;
      next();
    } else if (authToken === "") {
      res.status(404).json(new ApiResponse(404, "Login to access Data"));
    } else {
      res.status(404).json(new ApiResponse(404, "Token is invalid or expired"));
    }
  } catch (err) {
    res.status(401).json(new ApiError(401, { message: err.message }));
  }
};
export { AUTHENTICATE_USER };

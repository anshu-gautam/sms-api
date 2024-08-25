import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId }); // this value is coming from userController.loginUser where we we have jwt.sign
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    console.log({ e });
    res.status(401).send({ error: "Unauthorized access" });
  }
};
export default auth;

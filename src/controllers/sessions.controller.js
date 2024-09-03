import jwt from "jsonwebtoken";
import config from "../config/config.js";
import UserDTOSession from "../DTO/DTOSession.js";

const register = async (req, res) => {
  try {
    res.status(201).send({ status: "success", message: "User registered" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const sessionUser = new UserDTOSession(req.user);

    const sessionUserObject = { ...sessionUser };

    const token = jwt.sign(sessionUserObject, config.app.JWT.KEY, {
      expiresIn: '1h',
    });

    res.cookie("sid", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).send({
      status: "success",
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Login failed", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("sid");
    res.send({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Logout failed", error: error.message });
  }
};

const current = (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .send({
        status: "error",
        error: "USER_NOT_LOGGED",
        message: "User is not logged in",
      });
  }

  res.send({ status: "success", user: req.user });
};

export default {
  register,
  login,
  logout,
  current,
};

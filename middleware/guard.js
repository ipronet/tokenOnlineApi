const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const USERS = require("../model/User/UserModel");
const asynHandler = require("../middleware/async");
const ErrorResponse = require("../utls/errorResponse");

dotenv.config({ path: "./config/config.env" });

exports.protect = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.sauth) {
    token = req.cookies.sauth;
  }

  //make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route.", 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = await USERS.GetUser(decoded.sub);
    console.log(req.user);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route.", 401));
  }
});

exports.authorisRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorResponse("Role not authorised to access this route", 401)
      );
    }
    next();
  };
};

exports.authToken = function (req, res, next) {
  //Get token from the header

  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ Status: 0, Message: "No Token Authorisation Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.token = decoded.id;
    req.tokstate = decoded.state;
    console.log(decoded.state);
    if (!decoded.state) {
      return res
        .status(401)
        .json({ Status: 0, Message: "Please Activate Token" });
    }
  
    next();
  } catch (err) {
    res.status(401).json({ Status: 0, Message: "Token is not valid" });
  }
};

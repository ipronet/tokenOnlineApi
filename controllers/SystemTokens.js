const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Model = require("../model/TokenModel");
const asynHandler = require("../middleware/async");
exports.CreateClient = asynHandler(async (req, res, next) => {
  let ip = req.body.clientIP;
  let mac = req.body.clientMac;
  let email = req.body.email;
  let sysInfo = req.body.clientSystemInfo;

  //create hash
  const hash = crypto
    .createHash("sha256", `${ip}${mac}${sysInfo}`)
    .digest("hex");

    //Create email md5
    let newID = crypto.createHash("md5").update(email).digest("hex");
  //findCompany
  let checkEmail = await Model.Find("client_access", "email", email);
  if (checkEmail) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Already exist`,
    });
  }

  let checkIp = await Model.Find("client_access", "clientIP", ip);
  if (checkIp) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Already exist`,
    });
  }

  let checkMac = await Model.Find("client_access", "clientMac", mac);
  if (checkMac) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Already exist`,
    });
  }

  let checkSysInfo = await Model.Find(
    "client_access",
    "clientSystemInfo",
    sysInfo
  );
  if (checkSysInfo) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Already exist`,
    });
  }

  let checkHash = await Model.Find("client_access", "clientHash", hash);
  if (checkHash) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Already exist`,
    });
  }
  // //find hash if it exist
  const newData = {
    id:newID,
    clientName: req.body.clientName,
    address: req.body.address,
    email: email,
    phone: req.body.phone,
    clientHash: hash,
    clientIP: ip,
    clientMac: mac,
    clientSystemInfo: sysInfo,
    status: req.body.status,
  };

  let result = await Model.create(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

exports.CreateTokens = asynHandler(async (req, res, next) => {
  let clientID = req.body.clientID;
  let expiresIn = req.body.expiresIn;
  let description = req.body.description;
  //find client
  let checkHash = await Model.Find("client_access", "id", clientID);
  if (!checkHash) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... Client  Does not exist`,
    });
  }

  //GET CLIENT HASH
  let originalHash = checkHash.clientHash;
  //generate md5 from hash to be used in jwt
  let newHash = crypto.createHash("md5").update(originalHash).digest("hex");


  //find apikey if exist
  let findKey = await Model.Find("client_token", "apiKeyRef", newHash);
  if (findKey) {
    return res.status(400).json({
      Status: 0,
      Message: `Oops!... ApiKey  Already exist`,
    });
  }

  //generate jwt
  const token = jwt.sign({ id: newHash }, originalHash, {
    expiresIn: expiresIn,
  });

  const newData = {
    description: description,
    cllientID: clientID,
    apiKey: token,
    apiKeyRef:newHash,
    expireAt: expiresIn,
    status:req.body.status
  };
  let result = await Model.createToken(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

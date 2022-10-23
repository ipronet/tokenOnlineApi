var licenseKey = require('license-key-gen');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const jwt = require('jsonwebtoken');
const Swift = require("../model/TokenModel");
const asynHandler = require("../middleware/async");
const ErrorResponse = require("../utls/errorResponse");
exports.CreateClient = asynHandler(async (req, res, next) => {

    const userInfo = req.body;
    var licenseData = {
      info: userInfo,
      prodCode: process.env.prodCode,
      appVersion: process.env.appVersion,
      osType: process.env.osType,
    };
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
      var license = licenseKey.createLicense(licenseData);
      const token = jwt.sign({ id: license.license,state:req.body.status }, license.license, {expiresIn: "1day",});
     
    const SystemToken = {
      Company : req.body.Company ,
      AppName: req.body.AppName,
      SystemToken:token,
      SystemKeys: license.license,
      ipList : req.body.ipList ,
      status :req.body.status 
    };

  
    let result = await Swift.create(SystemToken);
    if (result.affectedRows === 1) {
      res.status(200).json({
        Status: 1,
        Message: `Record Created Successfully`,
        Data:{token_type: "x-auth-token",SystemToken}
      });
    } else {
      res.status(500).json({ Status: 0, Message: "Error Saving Record" });
    }

  });

exports.GetProfiles = asynHandler(async (req, res, next) => {
  let results = await Swift.all();
  if (results.length == 0) {
    return res.status(200).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
      Data: []
    });
  }
  res.json({
    Status: 1,
    Message: "Record Found",
    Data: results,
  });
});

exports.SingleProfile = asynHandler(async (req, res, next) => {
    let id = req.body.id;
    if (!id) {
      return res.status(400).json({
        Status: 0,
        Message: `Please provide id`,
      });
    }
    let dbresult = await Swift.find(id);
    if (!dbresult) {
      return res.status(200).json({
        Status: 0,
        Data: [],
        Message: `No record found`,
      });
    }
  
    res.json({
      Status: 1,
      Message: "Record Found",
      Data: dbresult,
    });
  });

exports.updateProfile = asynHandler(async (req, res, next) => {
  
  let id = req.body.id;
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide id`,
    });
  }
  const newData = {
    CustomerName : req.body.CustomerName ,
      email: req.body.email,
      sms:req.body.sms,
      account_number: req.body.account_number,
      idMsgType : req.body.idMsgType ,
      idFlow :req.body.idFlow ,
      message_template: req.body.message_template,
      internal_alert_email: req.body.internal_alert_email,
      idalert_type:req.body.idalert_type,
      status: req.body.status,
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  }
  let result = await Swift.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});

exports.RemoveProfile = asynHandler(async (req, res, next) => {
    let id = req.body.id;
  
    if (!id) {
      return res.status(400).json({
        Status: 0,
        Message: `Please provide id`,
      });
    }
    const newData = {
      status: 0,
      deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  
    };
    if (!id) {
      return res.status(400).json({
        Status: 0,
        Message: `Please provide an id`,
      });
    }
    let result = await Swift.update(newData, id);
  
  
  
    if (result.affectedRows === 1) {
      res.status(200).json({
        Status: 1,
        Message: `Record Deleted`,
      });
    } else {
      res.status(500).json({ Status: 0, Message: "Error Removing Record" });
    }
  });

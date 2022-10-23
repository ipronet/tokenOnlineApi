const {
  signup,
  updateuser,
  signin,
  email,
  Updatemail,
  comapny,
  Updatecomapny,
  authSettings,
  oauthClient,
  updateoauthClient,
  ldap,
  updateldap,
  alertProfile,
  path
} = require("../validation/swiftuser.schema");

module.exports = {
  userSignup: async (req, res, next) => {
    const value = await signup.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  userUpdate: async (req, res, next) => {
    const value = await updateuser.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  userSignIn: async (req, res, next) => {
    const value = await signin.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  emailSettings: async (req, res, next) => {
    const value = await email.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  updatemailSettings: async (req, res, next) => {
    const value = await Updatemail.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  companySettings: async (req, res, next) => {
    const value = await comapny.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  updatecompanySettings: async (req, res, next) => {
    const value = await Updatecomapny.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  authSettings: async (req, res, next) => {
    const value = await authSettings.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  OauthSettings: async (req, res, next) => {
    const value = await oauthClient.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  updateOauthSettings: async (req, res, next) => {
    const value = await updateoauthClient.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  ldapSettings: async (req, res, next) => {
    const value = await ldap.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  updateldapConfig: async (req, res, next) => {
    const value = await updateldap.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  AlertProfile: async (req, res, next) => {
    const value = await alertProfile.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  Path: async (req, res, next) => {
    const value = await path.validate(req.body);
    if (value.error) {
      res.status(400).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};

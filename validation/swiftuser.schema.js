const Joi = require("@hapi/joi");

const schema = {
  signup: Joi.object({
    fullname: Joi.string().required().label("Full Name"),

    phone: Joi.string()
      .min(10)
      .required()
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
      .message("Invalid mobile number")
      .label("Phone Number"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org"] },
      })
      .required()
      .label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string()
      .min(8)
      .regex(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
      )
      .message(
        "The value provided for the password does not meet the lenght, complexity or history requirement of the domain"
      )
      .required()
      .label("Password"),
  }),
  updateuser: Joi.object({
    fullname: Joi.string().required().label("Full Name"),

    phone: Joi.string()
      .min(10)
      .required()
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
      .message("Invalid mobile number")
      .label("Phone Number"),
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("Username"),
    acl_role: Joi.number().required().label("Role"),
    status: Joi.number().required().label("Status"),
  }),
  signin: Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string()
      .min(8)
      .regex(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
      )
      .message(
        "The value provided for the password does not meet the lenght, complexity or history requirement of the domain"
      )
      .required()
      .label("Password"),
  }),
  //email
  email: Joi.object({
    smtpHost: Joi.string().required().label("Smtp Host"),
    smtpPort: Joi.string().required().label("Smtp Port"),
    smtpTLS: Joi.string().required().label("TLs"),
    smtpUser: Joi.string().required().label("Smtp User"),
    smtpPass: Joi.string().required().label("Smtp Pass"),
    smtpFrom: Joi.string().required().label("Smtp From"),
    enabled: Joi.number().required().label("Enable ?"),
  }),
  //update email
  Updatemail: Joi.object({
    id: Joi.string().required().label("ID"),
    smtpHost: Joi.string().required().label("Smtp Host"),
    smtpPort: Joi.number().required().label("Smtp Port"),
    smtpTLS: Joi.number().required().label("TLs"),
    smtpUser: Joi.string().required().label("Smtp User"),
    smtpPass: Joi.string().required().label("Smtp Pass"),
    smtpFrom: Joi.string().required().label("Smtp From"),
    enabled: Joi.number().required().label("Enable ?"),
  }),

  //ldap
  ldap: Joi.object({
    ldap_user: Joi.string().required().label("Ldap User"),
    ldap_url: Joi.string().required().label("Ldap Url"),
    ldap_password: Joi.string().required().label("Ldap Password"),
    ldap_domain: Joi.string().required().label("Ldap Domain"),
    enabled: Joi.number().required().label("Enable ?"),
  }),

  //update ldap
  updateldap: Joi.object({
    id: Joi.string().required().label("ID"),
    ldap_user: Joi.string().required().label("Ldap User"),
    ldap_url: Joi.string().required().label("Ldap Url"),
    ldap_password: Joi.string().required().label("Ldap Password"),
    ldap_domain: Joi.string().required().label("Ldap Domain"),
    enabled: Joi.number().required().label("Enable ?"),
  }),

  comapny: Joi.object({
    comp_name: Joi.string().required().label("Company Name"),
    comp_slogan: Joi.string().required().label("Company Slogan"),
    comp_email: Joi.string().email().required().label("Company Email"),
    comp_url: Joi.string()
      .label("Comapny Url")
      .regex(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      )
      .message("Invalid Web Address")
      .required(),
    address: Joi.string().required().label("Address"),
  }),
  Updatecomapny: Joi.object({
    id: Joi.string().required().label("ID"),
    comp_name: Joi.string().required().label("Company Name"),
    comp_slogan: Joi.string().required().label("Company Slogan"),
    comp_email: Joi.string().email().required().label("Company Email"),
    comp_url: Joi.string()
      .label("Comapny Url")
      .regex(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      )
      .message("Invalid Web Address")
      .required(),
    address: Joi.string().required().label("Address"),
  }),
  oauthClient: Joi.object({
    apikey: Joi.string().required().label("API KEY"),
    secret: Joi.string().required().label("Secret"),
    oauthurl: Joi.string()
      .label("Oauth Url")

      .required(),
    redirect_uri: Joi.string()

      .required()
      .label("CallBack Url"),
    enabled: Joi.number().required().label("Enable ?"),
  }),
  updateoauthClient: Joi.object({
    id: Joi.string().required().label("ID"),
    apikey: Joi.string().required().label("API KEY"),
    secret: Joi.string().required().label("Secret"),
    url: Joi.string()
      .label("Oauth Url")

      .required(),
    redirect_uri: Joi.string()

      .required()
      .label("CallBack Url"),
    enabled: Joi.number().required().label("Enable ?"),
  }),
  authSettings: Joi.object({
    auth_type: Joi.number().required().label("Authentication Type"),
    mfa: Joi.number().required().label("Mfa Choice"),
  }),
  alertProfile: Joi.object({
    CustomerName: Joi.string().required().label("Customer Name"),
    email: Joi.string().email().required().label("Email"),
    sms: Joi.string()
      .min(10)
      .required()
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
      .message("Invalid sms number")
      .label("Sms Number"),
    account_number: Joi.string().required().label("Account Number"),
    idMsgType: Joi.string().required().label("Message Type"),
    idFlow: Joi.string().required().label("Message Flow"),
    message_template: Joi.any().required().label("Message Template"),
    internal_alert_email: Joi.string().email().required().label("Alert Email"),
    idalert_type: Joi.string().required().label("Alert Type"),
    status: Joi.number().required().label("Status"),
  }).unknown(),
  path: Joi.object({
    src_swift_docs_path_print: Joi.string().required().label("Print Path"),
    src_swift_docs_path_pdf: Joi.any().required().label("Pdf Path"),
    src_swift_docs_path_img: Joi.any().required().label("Image Path"),
    src_swift_docs_path_txt: Joi.any().required().label("Txt Path"),
  }).unknown(),
};

module.exports = schema;

const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too short")
    .max(28, "Password too long"),
});

const friendSchema = Yup.object({
  friendName: Yup.string()
    .required("Username is required")
    .max(28, "Invalid username")
    .min(6, "Invalid username"),
});

module.exports = { formSchema, friendSchema };

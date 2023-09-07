const {formSchema} = require("@hyper/common")


const ValidateForm = (req,res, next) => {
    const formData = req.body;
    formSchema
      .validate(formData)
      .catch((err) => 
      {
          res.status(422).send()
          console.log(err.errors)
      })
      .then((valid) => {
        if (valid) {
          console.log("Form is correct");
          next()
        } else {
          res.status(422).send();
        }
      });

}

module.exports = ValidateForm
const UserModel = require("../models/userSignupModel");

exports.createUser = function (req, res) {
  const newUser = {
    email_add: req.body.email_add,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth_date: req.body.birth_date,
    country: req.body.country,
    phone_number: req.body.phone_number
  };

  UserModel.create(newUser, (error, result) => {
    if (error) {
      if (error === 'Email address already exists') {
        console.error('Error creating user: email already exists');
        return res.status(409).send('Email address already exists');
      }
      console.error("Error creating user: ", error);
      res.status(500).send("Error creating user");
    } else {
      console.log("User created successfully");
      res.status(201).json({
        message: "User created successfully",
        data: result,
      });
    }
  });
};  

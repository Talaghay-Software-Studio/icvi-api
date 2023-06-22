const UserModel = require("../models/userSignupModel");

exports.createUser = function (req, res) {
  const newUser = {
    email_add: req.body.email_add,
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    category: req.body.category,
    phone_number: req.body.phone_number
  };

  // Validate the category field
  if (newUser.category !== "user" && newUser.category !== "guardian") {
    console.error('Error creating user: invalid category');
    return res.status(400).json({
      error: 'Invalid category',
      message: 'Only accepts: guardian or user'
    });
  }

  UserModel.create(newUser, (error, result) => {
    if (error) {
      if (error === 'Email address and username already exist') {
        console.error('Error creating user: email and username already exist');
        return res.status(409).json({
          error: 'Email address and username already exist',
          message: 'Error creating user: email and username already exist'
        });
      } else if (error === 'Email address already exists') {
        console.error('Error creating user: email already exists');
        return res.status(409).json({
          error: 'Email address already exists',
          message: 'Error creating user: email already exists'
        });
      } else if (error === 'Username already exists') {
        console.error('Error creating user: username already exists');
        return res.status(409).json({
          error: 'Username already exists',
          message: 'Error creating user: username already exists'
        });
      } else {
        console.error("Error creating user: ", error);
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error creating user'
        });
      }
    } else {
      console.log("User created successfully");
      res.status(201).json({
        message: "User created successfully",
        data: result,
      });
    }
  });
};

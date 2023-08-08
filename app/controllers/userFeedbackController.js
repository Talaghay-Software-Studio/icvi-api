const FeedbackModel = require("../models/feedbackModel");

const userFeedbackController = {};

userFeedbackController.createFeedback = (req, res) => {
  const feedbackData = {
    user_id: req.body.user_id,
    age: req.body.age,
    gender: req.body.gender,
    impairment_category: req.body.impairment_category,
    q1_star: req.body.q1_star,
    q2_star: req.body.q2_star,
    q3_star: req.body.q3_star,
    q4_star: req.body.q4_star,
    q5_star: req.body.q5_star,
    q6_star: req.body.q6_star,
    q7_star: req.body.q7_star,
    q8_star: req.body.q8_star,
    q9_star: req.body.q9_star,
    q10_star: req.body.q10_star,
  };

  FeedbackModel.createFeedback(feedbackData, (error, result) => {
    if (error) {
      console.error("Error creating feedback: ", error);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Error creating feedback",
      });
    } else {
      console.log("Feedback created successfully");

      res.status(201).json({
        message: "Feedback created successfully",
        data: result,
      });
    }
  });
};

module.exports = userFeedbackController;

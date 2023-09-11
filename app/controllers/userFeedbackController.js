const FeedbackModel = require("../models/feedbackModel");

const userFeedbackController = {};

userFeedbackController.createFeedback = (req, res) => {
  const feedbackData = {
    user_id: req.body.user_id,
    age: req.body.age,
    gender: req.body.gender,
    impairment_category: req.body.impairment_category,
    question_id: req.body.question_id, // Add question_id
    rating_star: req.body.rating_star, // Add rating_star
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

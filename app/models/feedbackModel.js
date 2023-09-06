const dbConn = require("../config/db.config");

const FeedbackModel = {};

FeedbackModel.createFeedback = (feedbackData, callback) => {
  dbConn.query(
    "INSERT INTO feedback_table (user_id, age, gender, impairment_category, question_id, rating_star) VALUES (?, ?, ?, ?, ?, ?)", // Include question_id and rating_star
    [
      feedbackData.user_id,
      feedbackData.age,
      feedbackData.gender,
      feedbackData.impairment_category,
      feedbackData.question_id, // Add question_id
      feedbackData.rating_star, // Add rating_star
    ],
    (error, result) => {
      if (error) {
        console.error("Error creating feedback: ", error);
        return callback(error, null);
      } else {
        return callback(null, result);
      }
    }
  );
};

module.exports = FeedbackModel;

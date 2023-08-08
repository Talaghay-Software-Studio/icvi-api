const dbConn = require("../config/db.config");

const FeedbackModel = {};

FeedbackModel.createFeedback = (feedbackData, callback) => {
  dbConn.query(
    "INSERT INTO feedback (user_id, age, gender, impairment_category, q1_star, q2_star, q3_star, q4_star, q5_star, q6_star, q7_star, q8_star, q9_star, q10_star) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      feedbackData.user_id,
      feedbackData.age,
      feedbackData.gender,
      feedbackData.impairment_category,
      feedbackData.q1_star,
      feedbackData.q2_star,
      feedbackData.q3_star,
      feedbackData.q4_star,
      feedbackData.q5_star,
      feedbackData.q6_star,
      feedbackData.q7_star,
      feedbackData.q8_star,
      feedbackData.q9_star,
      feedbackData.q10_star,
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

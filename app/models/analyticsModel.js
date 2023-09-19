// models/analyticsModel.js
const dbConn = require('../config/db.config');

const Analytics = {};

Analytics.getGenderData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT gender, COUNT(*) AS count FROM feedback_table GROUP BY gender";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving gender data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.gender,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

Analytics.getImpairmentData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT impairment_category, COUNT(*) AS count FROM feedback_table GROUP BY impairment_category";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving impairment data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.impairment_category,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

Analytics.getAgeData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT age, COUNT(*) AS count FROM feedback_table GROUP BY age";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving age data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.age,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

// user_details table analytics

Analytics.getGenderData2 = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT gender, COUNT(*) AS count FROM user_details GROUP BY gender";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving gender data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.gender,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

Analytics.getImpairmentData2 = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT impairment_category, COUNT(*) AS count FROM user_details GROUP BY impairment_category";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving impairment data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.impairment_category,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

Analytics.getAgeData2 = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT age, COUNT(*) AS count FROM user_details GROUP BY age";
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error("Error retrieving age data: ", err);
        return reject(err);
      }

      // Calculate percentages
      const total = res.reduce((acc, cur) => acc + cur.count, 0);
      const data = res.map((item) => ({
        name: item.age,
        value: ((item.count / total) * 100).toFixed(1),
      }));

      resolve(data);
    });
  });
};

Analytics.getQuestionFeedbackAnalytics = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT question_id, rating_star, COUNT(*) AS count
      FROM feedback_table
      GROUP BY question_id, rating_star
    `;
    dbConn.query(query, async (err, res) => {
      if (err) {
        console.error("Error retrieving question feedback analytics: ", err);
        return reject(err);
      }

      const questionData = {};

      // Calculate the total ratings for each question
      const questionIds = [...new Set(res.map((item) => item.question_id))];
      for (const questionId of questionIds) {
        const totalRatings = await getTotalRatingsForQuestion(questionId);
        questionData[questionId] = {
          type: `Question ${questionId}`,
          data: [],
          totalRatings,
        };
      }

      // Calculate the percentages
      for (const item of res) {
        const questionId = item.question_id;
        const ratingStar = item.rating_star;
        const count = item.count;

        const percentage = ((count / questionData[questionId].totalRatings) * 100).toFixed(1);

        questionData[questionId].data.push({
          name: `Rating ${ratingStar}`,
          value: `${percentage}`,
        });
      }

      resolve(Object.values(questionData));
    });
  });
};

// Helper function to get the total number of ratings for a question
function getTotalRatingsForQuestion(questionId) {
  const query = `
    SELECT COUNT(*) AS total_ratings
    FROM feedback_table
    WHERE question_id = ?
  `;
  return new Promise((resolve, reject) => {
    dbConn.query(query, [questionId], (err, res) => {
      if (err) {
        console.error("Error retrieving total ratings for question: ", err);
        return reject(err);
      }
      resolve(res[0].total_ratings);
    });
  });
}

module.exports = Analytics;

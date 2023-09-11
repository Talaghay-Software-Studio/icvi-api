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

module.exports = Analytics;

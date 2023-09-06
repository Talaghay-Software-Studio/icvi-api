const dbConn = require('../config/db.config');

const Questions = {};

Questions.createQuestions = (questions, result) => {
  dbConn.query("INSERT INTO questions (question) VALUES (?)", [questions], (err, res) => {
    if (err) {
      console.error("Error inserting questions: ", err);
      result(err, null);
      return;
    }
    console.log("Inserted questions: ", { id: res.insertId, question: questions });
    result(null, { id: res.insertId, question: questions });
  });
};

module.exports = Questions;

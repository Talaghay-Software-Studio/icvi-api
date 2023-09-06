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

Questions.updateQuestions = (id, question, result) => {
    dbConn.query("UPDATE questions SET question = ? WHERE id = ?", [question, id], (err, res) => {
      if (err) {
        console.error("Error updating question: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // No question found with the specified id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated question with id: ", id);
      result(null, { id: id, question: question });
    });
  };

  Questions.getAllQuestions = (result) => {
    dbConn.query("SELECT * FROM questions", (err, res) => {
      if (err) {
        console.error("Error retrieving questions: ", err);
        result(err, null);
        return;
      }
      console.log("Retrieved all questions");
      result(null, res);
    });
  };

  Questions.deleteQuestionsById = (id, result) => {
    dbConn.query("DELETE FROM questions WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.error("Error deleting question: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // If no rows were affected, it means the question with the specified ID was not found.
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted question with ID: ", id);
      result(null, res);
    });
  };

module.exports = Questions;

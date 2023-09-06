const QuestionsModel = require('../models/questionsModel');

const questionsController = {};

questionsController.createQuestions = (req, res) => {
  const { questions } = req.body;

  if (!questions) {
    return res.status(400).json({ message: "Questions field is required." });
  }

  QuestionsModel.createQuestions(questions, (err, result) => {
    if (err) {
      console.error("Error creating questions: ", err);
      return res.status(500).json({ message: "Error creating questions." });
    }

    return res.status(201).json({ message: "Questions created successfully.", question: result });
  });
};

questionsController.updateQuestions = (req, res) => {
    const { id, question } = req.body;
  
    if (!id || !question) {
      return res.status(400).json({ message: "Both id and question fields are required." });
    }
  
    QuestionsModel.updateQuestions(id, question, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).json({ message: `Question with id ${id} not found.` });
        }
        console.error("Error updating question: ", err);
        return res.status(500).json({ message: "Error updating question." });
      }
  
      return res.status(200).json({ message: "Question updated successfully.", question: result });
    });
  };

  questionsController.getAllQuestions = (req, res) => {
    QuestionsModel.getAllQuestions((err, result) => {
      if (err) {
        console.error("Error retrieving questions: ", err);
        return res.status(500).json({ message: "Error retrieving questions." });
      }
  
      return res.status(200).json({ message: "Questions retrieved successfully.", questions: result });
    });
  };

  questionsController.deleteQuestions = (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required for deleting a question." });
    }
  
    QuestionsModel.deleteQuestionsById(id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).json({ message: "Question not found with ID: " + id });
        }
        console.error("Error deleting question: ", err);
        return res.status(500).json({ message: "Error deleting question." });
      }
  
      return res.status(200).json({ message: "Question deleted successfully." });
    });
  };
  

module.exports = questionsController;

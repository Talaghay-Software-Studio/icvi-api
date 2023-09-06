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

module.exports = questionsController;

// controllers/analyticsController.js
const AnalyticsModel = require('../models/analyticsModel');

const analyticsController = {};

analyticsController.getAnalytics = async (req, res) => {
  try {
    const genderData = await AnalyticsModel.getGenderData();
    const impairmentData = await AnalyticsModel.getImpairmentData();
    const ageData = await AnalyticsModel.getAgeData();

    const responseData = [
      {
        type: "SEX",
        data: genderData,
      },
      {
        type: "VISUAL_IMPAIRMENTS",
        data: impairmentData,
      },
      {
        type: "AGE_RANGE",
        data: ageData,
      },
    ];

    return res.status(200).json({ data: responseData });
  } catch (err) {
    console.error("Error retrieving analytics: ", err);
    return res.status(500).json({ message: "Error retrieving analytics." });
  }
};

analyticsController.getAnalytics2 = async (req, res) => {
  try {
    const genderData = await AnalyticsModel.getGenderData2();
    const impairmentData = await AnalyticsModel.getImpairmentData2();
    const ageData = await AnalyticsModel.getAgeData2();

    const responseData = [
      {
        type: "SEX",
        data: genderData,
      },
      {
        type: "VISUAL_IMPAIRMENTS",
        data: impairmentData,
      },
      {
        type: "AGE_RANGE",
        data: ageData,
      },
    ];

    return res.status(200).json({ data: responseData });
  } catch (err) {
    console.error("Error retrieving analytics: ", err);
    return res.status(500).json({ message: "Error retrieving analytics." });
  }
};

analyticsController.getQuestionAnalytics = async (req, res) => {
  try {
    const questionFeedbackData = await AnalyticsModel.getQuestionFeedbackAnalytics();

    const responseData = [
      {
        type: "Question Feedback",
        data: questionFeedbackData,
      },
    ];

    return res.status(200).json({ data: responseData });
  } catch (err) {
    console.error("Error retrieving question feedback analytics: ", err);
    return res.status(500).json({ message: "Error retrieving question feedback analytics." });
  }
};

module.exports = analyticsController;

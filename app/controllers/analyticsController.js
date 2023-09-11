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

module.exports = analyticsController;

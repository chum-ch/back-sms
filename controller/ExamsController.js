/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../submodule/handle-error/index');
const Service = require('./Service');

function getPointsEarnedPerQuestion(userAnswers, options, points) {
  let earnedPoint = points;
  // 1. Count the IsCorrect answer in Options
  const correctOptionsCount = options.filter((option) => option.IsCorrect).length;

  // 2. Count the IsCorrect answer from UserAnswer
  let copyUserAnswer = userAnswers;
  if (!Array.isArray(copyUserAnswer)) {
    copyUserAnswer = [copyUserAnswer]; // Convert to array if not already an array
  }
  const correctUserAnswerCount = copyUserAnswer.filter((answer) => answer.IsCorrect).length;
  switch (true) {
    case correctUserAnswerCount === 0:
      earnedPoint = 0;
      break;
    case correctUserAnswerCount < correctOptionsCount && correctUserAnswerCount > 0 && points > 0:
      earnedPoint = points / correctOptionsCount;
      break;
    default:
      break;
  }
  return earnedPoint;
}

const listExams = async function listExams(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const examCollection = await db.cnListCollection();
      const exams = await db.cnListItems(req, examCollection.exams, { SCHOOLS_ID: req.params.schoolId });
      // const exams = await db.cnDeleteAllItem(req, examCollection.exams);
      resolve(Service.successResponse(exams, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createExam = async function createExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const examCollection = await db.cnListCollection();
      const { Questions } = req.body;
      const totalPoints = Questions.reduce((accumulator, currentObject) => {
        const points = parseInt(currentObject.Points, 10);
        const isNumber = Number(points);
        if (isNumber) {
          return accumulator + points;
        }
        return accumulator;
      }, 0);
      req.body.TotalQuestions = Questions.length;
      req.body.TotalPoints = totalPoints;
      const exam = await db.cnInsertOneItem(req, examCollection.exams);
      resolve(Service.successResponse(exam, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const submitExam = async function submitExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const { Questions } = req.body;
      Questions.forEach((question) => {
        const { UserAnswer = [], Options = [], Points = 0 } = question;
        const q = question;
        q.PointsEarnedPerQuestion = getPointsEarnedPerQuestion(UserAnswer, Options, Points);
      });
      const totalEarnedPoints = Questions.reduce((sum, question) => sum + question.PointsEarnedPerQuestion, 0);
      req.body.TotalEarnedPoints = totalEarnedPoints;
      const examCollection = await db.cnListCollection();
      // const exam = await db.cnInsertOneItem(req, examCollection.exams);
      resolve(Service.successResponse(req.body, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getExam = async function getExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnGetItem(req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateExam = async function updateExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnUpdateOneItem(req, req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteExam = async function deleteExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnDeleteOneItem(req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createExam, listExams, getExam, updateExam, deleteExam, submitExam,
};

/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../utils/utils');
const Service = require('./Service');

const listExams = async function listExams(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const examCollection = await db.cnListCollection();
      const exams = await db.cnListItems(req, examCollection.exams, { SCHOOLS_ID: req.params.schoolId });
      // const exams = await db.cnDeleteAllItem(req, examCollection.exams);
      resolve(Service.successResponse(exams, statusCode.OK));
    } catch (error) {
      console.log('Error list exams', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createExam = async function createExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const examCollection = await db.cnListCollection();
      const exam = await db.cnInsertOneItem(req, examCollection.exams);
      resolve(Service.successResponse(exam, statusCode.CREATED));
    } catch (error) {
      console.log('Error create exam', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getExam = async function getExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnGetItem(req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      console.log('Error get exam', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateExam = async function updateExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnUpdateOneItem(req, req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      console.log('Error update exam', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteExam = async function deleteExam(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const exam = await db.cnDeleteOneItem(req.params.examId);
      resolve(Service.successResponse(exam, statusCode.OK));
    } catch (error) {
      console.log('Error delete exam', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createExam, listExams, getExam, updateExam, deleteExam,
};

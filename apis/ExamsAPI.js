/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listExams = async function listExams(req, res) {
  try {
    const exams = await API.ExamsController.listExams(req);
    // const exams = await db.cnDeleteAllItem(req, trainerCollection.exams);
    res.status(exams.StatusCode).send(exams.data);
  } catch (error) {
    console.log('API error list exams', error);
    res.status(error.StatusCode).send(error);
  }
};

const createExam = async function createExam(req, res) {
  try {
    const exam = await API.ExamsController.createExam(req);
    res.status(exam.StatusCode).send(exam.data);
  } catch (error) {
    console.log('API error create exam', error);
    res.status(error.StatusCode).send(error);
  }
};

const getExam = async function getExam(req, res) {
  try {
    const exam = await API.ExamsController.getExam(req);
    res.status(exam.StatusCode).send(exam.data);
  } catch (error) {
    console.log('API error get exam', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateExam = async function updateExam(req, res) {
  try {
    const exam = await API.ExamsController.updateExam(req);
    res.status(exam.StatusCode).send(exam.data);
  } catch (error) {
    console.log('API error update exam', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteExam = async function deleteExam(req, res) {
  try {
    const exam = await API.ExamsController.deleteExam(req);
    res.status(exam.StatusCode).send(exam.data);
  } catch (error) {
    console.log('API error delete exam', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createExam, listExams, getExam, updateExam, deleteExam,
};

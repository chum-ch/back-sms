/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listProgresses = async function listProgresses(req, res) {
  try {
    const progresses = await API.ProgressesController.listProgresses(req);
    res.status(progresses.StatusCode).send(progresses.data);
  } catch (error) {
    console.error('API List progress error', error);
    res.status(error.StatusCode).send(error.data);
  }
};

const createProgress = async function createProgress(req, res) {
  try {
    const progress = await API.ProgressesController.createProgress(req);
    res.status(progress.StatusCode).send(progress.data);
  } catch (error) {
    console.error('API Error create progress', error);
    CustomError.send(res, error);
  }
};

const getProgress = async function getProgress(req, res) {
  try {
    const progress = await API.ProgressesController.getProgress(req);
    res.status(progress.StatusCode).send(progress.data);
  } catch (error) {
    console.error('API Error get progress', error);
    CustomError.send(res, error);
  }
};
const getRoomProgress = async function getRoomProgress(req, res) {
  try {
    const roomProgress = await API.ProgressesController.getRoomProgress(req);
    res.status(roomProgress.StatusCode).send(roomProgress.data);
  } catch (error) {
    console.error('API Error get progress', error);
    CustomError.send(res, error);
  }
};

const updateProgress = async function updateProgress(req, res) {
  try {
    const progress = await API.ProgressesController.updateProgress(req);
    res.status(progress.StatusCode).send(progress.data);
  } catch (error) {
    console.error('API Error update progress', error);
    CustomError.send(res, error);
  }
};

const deleteProgress = async function deleteProgress(req, res) {
  try {
    const progress = await API.ProgressesController.deleteProgress(req);
    res.status(progress.StatusCode).send(progress.data);
  } catch (error) {
    console.error('API Error delete progress', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createProgress, listProgresses, updateProgress, deleteProgress, getRoomProgress, getProgress
};

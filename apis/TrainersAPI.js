/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listTrainers = async function listTrainers(req, res) {
  try {
    const trainers = await API.TrainersController.listTrainers(req);
    // const trainers = await db.cnDeleteAllItem(req, trainerCollection.trainers);
    res.status(trainers.StatusCode).send(trainers.data);
  } catch (error) {
    console.log('API error list trainers', error);
    CustomError.send(res, error);
  }
};

const createTrainer = async function createTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.createTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error create trainer', error);
    CustomError.send(res, error);
  }
};

const getTrainer = async function getTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.getTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error get trainer', error);
    CustomError.send(res, error);
  }
};

const updateTrainer = async function updateTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.updateTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error update trainer', error);
    CustomError.send(res, error);
  }
};

const deleteTrainer = async function deleteTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.deleteTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error delete trainer', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createTrainer, listTrainers, getTrainer, updateTrainer, deleteTrainer,
};

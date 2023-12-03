/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listTrainers = async function listTrainers(req, res) {
  try {
    const trainers = await API.TrainersController.listTrainers(req);
    // const trainers = await db.cnDeleteAllItem(req, trainerCollection.trainers);
    res.status(trainers.StatusCode).send(trainers.data);
  } catch (error) {
    console.log('API error list trainers', error);
    res.status(error.StatusCode).send(error);
  }
};

const createTrainer = async function createTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.createTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error create trainer', error);
    res.status(error.StatusCode).send(error);
  }
};

const getTrainer = async function getTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.getTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error get trainer', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateTrainer = async function updateTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.updateTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error update trainer', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteTrainer = async function deleteTrainer(req, res) {
  try {
    const trainer = await API.TrainersController.deleteTrainer(req);
    res.status(trainer.StatusCode).send(trainer.data);
  } catch (error) {
    console.log('API error delete trainer', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createTrainer, listTrainers, getTrainer, updateTrainer, deleteTrainer,
};

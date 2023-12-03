/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const statusCode = require('../utils/statusCode');
const Service = require('./Service');

const listTrainers = async function listTrainers(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const trainerCollection = await db.cnListCollection();
      const trainers = await db.cnListItems(req, trainerCollection.trainers, { SCHOOLS_ID: req.params.schoolId });
      // const trainers = await db.cnDeleteAllItem(req, trainerCollection.trainers);
      resolve(Service.successResponse(trainers, statusCode.OK));
    } catch (error) {
      console.log('Error list trainers', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createTrainer = async function createTrainer(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const trainerCollection = await db.cnListCollection();
      const trainer = await db.cnInsertOneItem(req, trainerCollection.trainers);
      resolve(Service.successResponse(trainer, statusCode.CREATED));
    } catch (error) {
      console.log('Error create trainer', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getTrainer = async function getTrainer(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const trainer = await db.cnGetItem(req.params.trainerId);
      resolve(Service.successResponse(trainer, statusCode.OK));
    } catch (error) {
      console.log('Error get trainer', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateTrainer = async function updateTrainer(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const trainer = await db.cnUpdateOneItem(req, req.params.trainerId);
      resolve(Service.successResponse(trainer, statusCode.OK));
    } catch (error) {
      console.log('Error update trainer', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteTrainer = async function deleteTrainer(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const trainer = await db.cnDeleteOneItem(req.params.trainerId);
      resolve(Service.successResponse(trainer, statusCode.OK));
    } catch (error) {
      console.log('Error delete trainer', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createTrainer, listTrainers, getTrainer, updateTrainer, deleteTrainer,
};

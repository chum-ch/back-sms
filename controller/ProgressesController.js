/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode, getBatchProgress } = require('../utils/utils');
const Service = require('./Service');

const listProgresses = function listProgresses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progressCollection = await db.cnListCollection();
      const progresses = await db.cnListItems(req, progressCollection.progresses);
      resolve(Service.successResponse(progresses, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createProgress = async function createProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progressCollection = await db.cnListCollection();
      const progress = await db.cnInsertOneItem(req, progressCollection.progresses);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      console.error('Error create progress', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getRoomProgress = async function getRoomProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rooms } = await db.cnListCollection();
      const { data, data: { Total } } = await getProgress(req);
      const roomData = await db.cnListItems(req, rooms, { PROGRESSES_ID: req.params.progressId });
      const progressBatchUpload = getBatchProgress(roomData.length, Total)
      data.DoneProgresses = progressBatchUpload
      resolve(Service.successResponse(data, statusCode.OK));
    } catch (error) {
      console.error('Error get room progress', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};
const getProgress = async function getProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnGetItem(req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      console.error('Error get room progress', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateProgress = async function updateProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnUpdateOneItem(req, req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      console.error('Error update progress', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteProgress = async function deleteProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnDeleteOneItem(req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      console.error('Error delete progress', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createProgress, listProgresses, getRoomProgress, updateProgress, deleteProgress, getProgress,
};
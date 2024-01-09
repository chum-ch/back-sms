/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { getBatchProgress } = require('../utils/utils');
const { statusCode } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listProgresses = function listProgresses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progressCollection = await db.cnListCollection();
      const progresses = await db.cnListItems(req, progressCollection.progresses);
      resolve(Service.successResponse(progresses, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
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
      reject(Service.rejectResponse(error));
    }
  });
};

const getProgress = async function getProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnGetItem(req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getRoomProgress = async function getRoomProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rooms } = await db.cnListCollection();
      const { data, data: { Total } } = await getProgress(req);
      const roomData = await db.cnListItems(req, rooms, { PROGRESSES_ID: req.params.progressId });
      const progressBatchUpload = getBatchProgress(roomData.length, Total);
      if (progressBatchUpload >= 100) {
        await deleteProgress(req);
      }
      data.DoneProgresses = progressBatchUpload;
      resolve(Service.successResponse(data, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const getScheduleProgress = async function getScheduleProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { schedules } = await db.cnListCollection();
      const scheduleData = await db.cnListItems(req, schedules, { PROGRESSES_ID: req.params.progressId });
      const { data, data: { Total } } = await getProgress(req);
      const progressBatchUpload = getBatchProgress(scheduleData.length, Total);
      if (progressBatchUpload >= 100) {
        await deleteProgress(req);
      }
      data.DoneProgresses = progressBatchUpload;
      resolve(Service.successResponse(data, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};


const updateProgress = async function updateProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnUpdateOneItem(req, req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteProgress = async function deleteProgress(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const progress = await db.cnDeleteOneItem(req.params.progressId);
      resolve(Service.successResponse(progress, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createProgress, listProgresses, getRoomProgress, getScheduleProgress, updateProgress, deleteProgress, getProgress,
};

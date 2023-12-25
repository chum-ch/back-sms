/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listSchedules = async function listSchedules(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const scheduleCollection = await db.cnListCollection();
      const schedule = await db.cnListItems(req, scheduleCollection.schedules, { SCHOOLS_ID: req.params.schoolId });
      // const schedule = await db.cnDeleteAllItem(req, scheduleCollection.schedules);
      resolve(Service.successResponse(schedule, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createSchedule = async function createSchedule(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const scheduleCollection = await db.cnListCollection();
      const schedule = await db.cnInsertOneItem(req, scheduleCollection.schedules);
      resolve(Service.successResponse(schedule, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getSchedule = async function getSchedule(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schedule = await db.cnGetItem(req.params.scheduleId);
      resolve(Service.successResponse(schedule, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateSchedule = async function updateSchedule(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schedule = await db.cnUpdateOneItem(req, req.params.scheduleId);
      resolve(Service.successResponse(schedule, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteSchedule = async function deleteSchedule(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schedule = await db.cnDeleteOneItem(req.params.scheduleId);
      resolve(Service.successResponse(schedule, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createSchedule, listSchedules, getSchedule, updateSchedule, deleteSchedule,
};

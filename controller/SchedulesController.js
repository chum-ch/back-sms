/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { UploadFile } = require('../utils/utils');
const { statusCode } = require('../submodule/handle-error/index');
const Service = require('./Service');
const scheduleRule = require('../schemas/ScheduleRules.json');

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

const uploadSchedule = async function uploadSchedule(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { ErrorColumnHeaders, ErrorRows } = UploadFile.validateExcel(req, scheduleRule);
      if ((ErrorColumnHeaders && ErrorColumnHeaders.length > 0)
        || (ErrorRows && ErrorRows.length > 0)
      ) {
        resolve(Service.successResponse({ ErrorColumnHeaders, ErrorRows }, statusCode.BAD_REQUEST));
      } else {
        const { progresses } = await db.cnListCollection();
        const sheetData = UploadFile.readExcelFile(req, scheduleRule);
        const dataFromExcel = UploadFile.getDataAfterValidateExcel(sheetData);
        req.body = {
          SCHOOLS_ID: req.params.schoolId,
          Total: dataFromExcel.length,
        };
        const progress = await db.cnInsertOneItem(req, progresses);
        for (let index = 0; index < dataFromExcel.length; index += 1) {
          const scheduleData = dataFromExcel[index];
          scheduleData.PROGRESSES_ID = progress.PROGRESSES_ID;
          req.body = scheduleData;
          await createSchedule(req);
        }
        resolve(Service.successResponse(progress, statusCode.CREATED));
      }
    } catch (error) {
      console.log('Error create room', error);
      reject(Service.rejectResponse(error));
    }
  });
};

const downloadSchedule = async function downloadSchedule() {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(Service.successResponse(scheduleRule, statusCode.OK));
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
  createSchedule, listSchedules, getSchedule, updateSchedule, deleteSchedule, downloadSchedule, uploadSchedule,
};

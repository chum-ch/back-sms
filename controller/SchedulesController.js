/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const utils = require('../utils/utils');
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
      const { ErrorColumnHeaders, ErrorRows } = utils.UploadFile.validateExcel(req, scheduleRule);
      if ((ErrorColumnHeaders && ErrorColumnHeaders.length > 0)
        || (ErrorRows && ErrorRows.length > 0)
      ) {
        resolve(Service.successResponse({ ErrorColumnHeaders, ErrorRows }, statusCode.BAD_REQUEST));
      } else {
        const { progresses } = await db.cnListCollection();
        const sheetData = utils.UploadFile.readExcelFile(req, scheduleRule);
        const dataFromExcel = utils.UploadFile.getDataAfterValidateExcel(sheetData);
        req.body = {
          SCHOOLS_ID: req.params.schoolId,
          Total: dataFromExcel.length,
        };
        const progress = await db.cnInsertOneItem(req, progresses);
        for (let index = 0; index < dataFromExcel.length; index += 1) {
          const {
            Date, Trainer, Gender, Courses, Credit, Classes, Room, StartTime, EndTime,
          } = dataFromExcel[index];
          // Creating the relevant recourses
          // Step 1: creating trainer
          const [lastName, ...firstNameParts] = Trainer.split(' ');
          const firstName = firstNameParts.join(' ');
          const trainerBody = {
            FirstName: firstName,
            LastName: lastName,
            Gender: { Value: Gender },
          };
          req.body = trainerBody;
          const { data: { TRAINERS_ID } } = await utils.TrainersController.createTrainer(req);
          // Step 2: creating course
          const courseBody = {
            Name: Courses,
            Credit,
          };
          req.body = courseBody;
          const { data: { COURSES_ID } } = await utils.CoursesController.createCourse(req);
          // Step 3: creating room
          const roomBody = {
            Name: Room,
          };
          req.body = roomBody;
          const { data: { ROOMS_ID } } = await utils.RoomsController.createRoom(req);
          // Step 4: creating class
          const classBody = {
            Name: Classes,
            Room: {
              Id: ROOMS_ID,
              Name: Room,
            },
          };
          req.body = classBody;
          const { data: { CLASSES_ID } } = await utils.ClassesController.createClass(req);

          const scheduleBody = {
            PROGRESSES_ID: progress.PROGRESSES_ID,
            Date,
            StartTime,
            EndTime,
            Trainer: {
              Id: TRAINERS_ID,
              Name: `${lastName} ${firstName}`,
            },
            Course: {
              Id: COURSES_ID,
              Name: Courses,
            },
            Room: {
              Id: ROOMS_ID,
              Name: Room,
            },
            Class: {
              Id: CLASSES_ID,
              Name: Classes,
            },
          };
          req.body = scheduleBody;
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

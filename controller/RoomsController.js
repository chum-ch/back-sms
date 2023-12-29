/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { UploadFile } = require('../utils/utils');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');
const roomRule = require('../schemas/RoomRules.json');
const Service = require('./Service');

const listRooms = async function listRooms(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomCollection = await db.cnListCollection();
      const rooms = await db.cnListItems(req, roomCollection.rooms, {
        SCHOOLS_ID: req.params.schoolId,
      });
      // const rooms = await db.cnDeleteAllItem(req, roomCollection.rooms);
      resolve(Service.successResponse(rooms, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createRoom = async function createRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      if (!input.Name) {
        throw new CustomError({
          key: KeyError.InputValidation,
        });
      }
      req.body.SCHOOLS_ID = req.params.schoolId;
      const roomCollection = await db.cnListCollection();
      const room = await db.cnInsertOneItem(req, roomCollection.rooms);
      resolve(Service.successResponse(room, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const uploadRoom = async function uploadRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const resultValidation = UploadFile.validateExcel(req, roomRule);
      if (
        resultValidation.ErrorColumnHeaders.length > 0
        || resultValidation.ErrorRows.length > 0
      ) {
        resolve(Service.successResponse(resultValidation, statusCode.BAD_REQUEST));
      } else {
        const { progresses } = await db.cnListCollection();
        const sheetData = UploadFile.readExcelFile(req, roomRule);
        const data = UploadFile.getDataAfterValidateExcel(sheetData);
        req.body = {
          SCHOOLS_ID: req.params.schoolId,
          Total: data.length,
        };
        const progress = await db.cnInsertOneItem(req, progresses);
        for (let index = 0; index < data.length; index += 1) {
          const roomData = data[index];
          roomData.PROGRESSES_ID = progress.PROGRESSES_ID;
          req.body = roomData;
          await createRoom(req);
        }
        resolve(Service.successResponse(progress, statusCode.CREATED));
      }
    } catch (error) {
      console.log('Error create room', error);
      reject(Service.rejectResponse(error));
    }
  });
};
const downloadRoom = async function downloadRoom() {
  return new Promise(async (resolve, reject) => {
    try {
      const result = UploadFile.getTemplate(roomRule);
      resolve(Service.successResponse(result, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const getRoom = async function getRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnGetItem(req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateRoom = async function updateRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnUpdateOneItem(req, req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteRoom = async function deleteRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnDeleteOneItem(req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
module.exports = {
  createRoom,
  listRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  uploadRoom,
  downloadRoom,
};

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
          message: 'Room name is required.',
        });
      }
      req.body.SCHOOLS_ID = req.params.schoolId;
      const roomCollection = await db.cnListCollection();
      req.query = {
        SCHOOLS_ID: req.params.schoolId,
        Name: input.Name,
      };
      const { data: [existingRoom] } = await listRooms(req);
      if (!existingRoom) {
        req.body = input;
        const room = await db.cnInsertOneItem(req, roomCollection.rooms);
        resolve(Service.successResponse(room, statusCode.CREATED));
      } else {
        resolve(Service.successResponse(existingRoom, statusCode.CREATED));
      }
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const uploadRoom = async function uploadRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { ErrorColumnHeaders, ErrorRows } = UploadFile.validateExcel(req, roomRule);
      if ((ErrorColumnHeaders && ErrorColumnHeaders.length > 0)
        || (ErrorRows && ErrorRows.length > 0)
      ) {
        resolve(Service.successResponse({ ErrorColumnHeaders, ErrorRows }, statusCode.BAD_REQUEST));
      } else {
        const { progresses } = await db.cnListCollection();
        const sheetData = UploadFile.readExcelFile(req, roomRule);
        const dataFromExcel = UploadFile.getDataAfterValidateExcel(sheetData);
        req.body = {
          SCHOOLS_ID: req.params.schoolId,
          Total: dataFromExcel.length,
        };
        const progress = await db.cnInsertOneItem(req, progresses);
        for (let index = 0; index < dataFromExcel.length; index += 1) {
          const roomData = dataFromExcel[index];
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
      resolve(Service.successResponse(roomRule, statusCode.OK));
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

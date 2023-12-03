/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const statusCode = require('../utils/statusCode');
const Service = require('./Service');

const listRooms = async function listRooms(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const roomCollection = await db.cnListCollection();
      const rooms = await db.cnListItems(req, roomCollection.rooms, { SCHOOLS_ID: req.params.schoolId });
      // const rooms = await db.cnDeleteAllItem(req, roomCollection.rooms);
      resolve(Service.successResponse(rooms, statusCode.OK));
    } catch (error) {
      console.log('Error list rooms', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createRoom = async function createRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const roomCollection = await db.cnListCollection();
      const room = await db.cnInsertOneItem(req, roomCollection.rooms);
      resolve(Service.successResponse(room, statusCode.CREATED));
    } catch (error) {
      console.log('Error create room', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getRoom = async function getRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnGetItem(req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      console.log('Error get room', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateRoom = async function updateRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnUpdateOneItem(req, req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      console.log('Error update room', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteRoom = async function deleteRoom(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.cnDeleteOneItem(req.params.roomId);
      resolve(Service.successResponse(room, statusCode.OK));
    } catch (error) {
      console.log('Error delete room', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createRoom, listRooms, getRoom, updateRoom, deleteRoom,
};

/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listRooms = async function listRooms(req, res) {
  try {
    const rooms = await API.RoomsController.listRooms(req);
    // const rooms = await db.cnDeleteAllItem(req, roomCollection.rooms);
    res.status(rooms.StatusCode).send(rooms.data);
  } catch (error) {
    console.log('API error list rooms', error);
    CustomError.send(res, error);
  }
};

const createRoom = async function createRoom(req, res) {
  try {
    const room = await API.RoomsController.createRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error create room', error);
    CustomError.send(res, error);
  }
};
const uploadRoom = async function uploadRoom(req, res) {
  try {
    const room = await API.RoomsController.uploadRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error upload room', error);
    CustomError.send(res, error);
  }
};
const downloadRoom = async function downloadRoom(req, res) {
  try {
    const room = await API.RoomsController.downloadRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error download room', error);
    CustomError.send(res, error);
  }
};

const getRoom = async function getRoom(req, res) {
  try {
    const room = await API.RoomsController.getRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error get room', error);
    CustomError.send(res, error);
  }
};

const updateRoom = async function updateRoom(req, res) {
  try {
    const room = await API.RoomsController.updateRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error update room', error);
    CustomError.send(res, error);
  }
};

const deleteRoom = async function deleteRoom(req, res) {
  try {
    const room = await API.RoomsController.deleteRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error delete room', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createRoom, listRooms, getRoom, updateRoom, deleteRoom, uploadRoom, downloadRoom,
};

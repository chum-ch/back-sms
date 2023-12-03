/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listRooms = async function listRooms(req, res) {
  try {
    const rooms = await API.RoomsController.listRooms(req);
    // const rooms = await db.cnDeleteAllItem(req, roomCollection.rooms);
    res.status(rooms.StatusCode).send(rooms.data);
  } catch (error) {
    console.log('API error list rooms', error);
    res.status(error.StatusCode).send(error);
  }
};

const createRoom = async function createRoom(req, res) {
  try {
    const room = await API.RoomsController.createRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error create room', error);
    res.status(error.StatusCode).send(error);
  }
};

const getRoom = async function getRoom(req, res) {
  try {
    const room = await API.RoomsController.getRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error get room', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateRoom = async function updateRoom(req, res) {
  try {
    const room = await API.RoomsController.updateRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error update room', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteRoom = async function deleteRoom(req, res) {
  try {
    const room = await API.RoomsController.deleteRoom(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error delete room', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createRoom, listRooms, getRoom, updateRoom, deleteRoom,
};

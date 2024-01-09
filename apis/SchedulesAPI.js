/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listSchedules = async function listSchedules(req, res) {
  try {
    const schedules = await API.SchedulesController.listSchedules(req);
    // const schedule = await db.cnDeleteAllItem(req, scheduleCollection.schedules);
    res.status(schedules.StatusCode).send(schedules.data);
  } catch (error) {
    console.log('API Error list schedule', error);
    CustomError.send(res, error);
  }
};

const createSchedule = async function createSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.createSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error create schedule', error);
    CustomError.send(res, error);
  }
};

const getSchedule = async function getSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.getSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error get schedule', error);
    CustomError.send(res, error);
  }
};
const uploadSchedule = async function uploadSchedule(req, res) {
  try {
    const room = await API.SchedulesController.uploadSchedule(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error upload room', error);
    CustomError.send(res, error);
  }
};
const downloadSchedule = async function downloadSchedule(req, res) {
  try {
    const room = await API.SchedulesController.downloadSchedule(req);
    res.status(room.StatusCode).send(room.data);
  } catch (error) {
    console.log('API error download room', error);
    CustomError.send(res, error);
  }
};

const updateSchedule = async function updateSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.updateSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error update schedule', error);
    CustomError.send(res, error);
  }
};

const deleteSchedule = async function deleteSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.deleteSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error delete schedule', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createSchedule, listSchedules, getSchedule, updateSchedule, deleteSchedule, downloadSchedule, uploadSchedule,
};

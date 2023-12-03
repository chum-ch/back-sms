/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listSchedules = async function listSchedules(req, res) {
  try {
    const schedules = await API.SchedulesController.listSchedules(req);
    // const schedule = await db.cnDeleteAllItem(req, scheduleCollection.schedules);
    res.status(schedules.StatusCode).send(schedules.data);
  } catch (error) {
    console.log('API Error list schedule', error);
    res.status(error.StatusCode).send(error);
  }
};

const createSchedule = async function createSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.createSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error create schedule', error);
    res.status(error.StatusCode).send(error);
  }
};

const getSchedule = async function getSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.getSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error get schedule', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateSchedule = async function updateSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.updateSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error update schedule', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteSchedule = async function deleteSchedule(req, res) {
  try {
    const schedule = await API.SchedulesController.deleteSchedule(req);
    res.status(schedule.StatusCode).send(schedule.data);
  } catch (error) {
    console.log('API Error delete schedule', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createSchedule, listSchedules, getSchedule, updateSchedule, deleteSchedule,
};

/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listClasses = async function listClasses(req, res) {
  try {
    const classes = await API.ClassesController.listClasses(req);
    // const classes = await db.cnDeleteAllItem(req, classCollection.classes);
    res.status(classes.StatusCode).send(classes.data);
  } catch (error) {
    console.log('API error list classes', error);
    CustomError.send(res, error);
  }
};

const createClass = async function createClass(req, res) {
  try {
    req.body.SCHOOLS_ID = req.params.schoolId;
    const insertClass = await API.ClassesController.createClass(req);
    res.status(insertClass.StatusCode).send(insertClass.data);
  } catch (error) {
    console.log('API error create class', error);
    CustomError.send(res, error);
  }
};

const getClass = async function getClass(req, res) {
  try {
    const classItem = await API.ClassesController.getClass(req);
    res.status(classItem.StatusCode).send(classItem.data);
  } catch (error) {
    console.log('API error get class', error);
    CustomError.send(res, error);
  }
};

const updateClass = async function updateClass(req, res) {
  try {
    const input = req.body;
    delete input._id;
    req.body = input;
    const classUpdate = await API.ClassesController.updateClass(req);
    res.status(classUpdate.StatusCode).send(classUpdate.data);
  } catch (error) {
    console.log('API error update class', error);
    CustomError.send(res, error);
  }
};

const deleteClass = async function deleteClass(req, res) {
  try {
    const classDelete = await API.ClassesController.deleteClass(req);
    res.status(classDelete.StatusCode).send(classDelete.data);
  } catch (error) {
    console.log('API error delete class', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createClass, listClasses, getClass, updateClass, deleteClass,
};

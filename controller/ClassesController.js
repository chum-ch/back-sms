/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../utils/utils');
const Service = require('./Service');

const listClasses = async function listClasses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classCollection = await db.cnListCollection();
      const classes = await db.cnListItems(req, classCollection.classes, { SCHOOLS_ID: req.params.schoolId });
      // const classes = await db.cnDeleteAllItem(req, classCollection.classes);
      resolve(Service.successResponse(classes, statusCode.OK));
    } catch (error) {
      console.log('Error list classes', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createClass = async function createClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const classCollection = await db.cnListCollection();
      const insertClass = await db.cnInsertOneItem(req, classCollection.classes);
      resolve(Service.successResponse(insertClass, statusCode.CREATED));
    } catch (error) {
      console.log('Error create class', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getClass = async function getClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classItem = await db.cnGetItem(req.params.classId);
      resolve(Service.successResponse(classItem, statusCode.OK));
    } catch (error) {
      console.log('Error get class', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateClass = async function updateClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      delete input._id;
      req.body = input;
      const classUpdate = await db.cnUpdateOneItem(req, req.params.classId);
      resolve(Service.successResponse(classUpdate, statusCode.OK));
    } catch (error) {
      console.log('Error update class', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteClass = async function deleteClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classDelete = await db.cnDeleteOneItem(req.params.classId);
      resolve(Service.successResponse(classDelete, statusCode.OK));
    } catch (error) {
      console.log('Error delete class', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createClass, listClasses, getClass, updateClass, deleteClass,
};

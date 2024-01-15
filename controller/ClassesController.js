/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listClasses = async function listClasses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classCollection = await db.cnListCollection();
      const classes = await db.cnListItems(req, classCollection.classes, { SCHOOLS_ID: req.params.schoolId });
      // const classes = await db.cnDeleteAllItem(req, classCollection.classes);
      resolve(Service.successResponse(classes, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createClass = async function createClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      if (!input.Name) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Class name is required.',
        });
      } else if (!input.Room || Object.keys(input.Room).length === 0) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Room name is required.',
        });
      }
      req.body.SCHOOLS_ID = req.params.schoolId;
      req.query = {
        SCHOOLS_ID: req.params.schoolId,
        Name: input.Name,
      };
      const { data: [existingClass] } = await listClasses(req);
      if (!existingClass) {
        req.body = input;
        const classCollection = await db.cnListCollection();
        const insertClass = await db.cnInsertOneItem(req, classCollection.classes);
        resolve(Service.successResponse(insertClass, statusCode.CREATED));
      } else {
        resolve(Service.successResponse(existingClass, statusCode.CREATED));
      }
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getClass = async function getClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classItem = await db.cnGetItem(req.params.classId);
      resolve(Service.successResponse(classItem, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
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
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteClass = async function deleteClass(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const classDelete = await db.cnDeleteOneItem(req.params.classId);
      resolve(Service.successResponse(classDelete, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createClass, listClasses, getClass, updateClass, deleteClass,
};

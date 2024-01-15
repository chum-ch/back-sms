/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listSchools = function listSchools(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schoolCollection = await db.cnListCollection();
      const schools = await db.cnListItems(req, schoolCollection.schools);
      resolve(Service.successResponse(schools, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createSchool = async function createSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      if (!input.Name) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'School name is required.',
        });
      }
      const schoolCollection = await db.cnListCollection();
      const school = await db.cnInsertOneItem(req, schoolCollection.schools);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getSchool = async function getSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnGetItem(req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateSchool = async function updateSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnUpdateOneItem(req, req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteSchool = async function deleteSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnDeleteOneItem(req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createSchool, listSchools, getSchool, updateSchool, deleteSchool,
};

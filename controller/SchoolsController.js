/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const statusCode = require('../utils/statusCode');
const Service = require('./Service');

const listSchools = function listSchools(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schoolCollection = await db.cnListCollection();
      const schools = await db.cnListItems(req, schoolCollection.schools);
      resolve(Service.successResponse(schools, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createSchool = async function createSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const schoolCollection = await db.cnListCollection();
      const school = await db.cnInsertOneItem(req, schoolCollection.schools);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      console.error('Error create school', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getSchool = async function getSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnGetItem(req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      console.error('Error get school', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateSchool = async function updateSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnUpdateOneItem(req, req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      console.error('Error update school', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteSchool = async function deleteSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const school = await db.cnDeleteOneItem(req.params.schoolId);
      resolve(Service.successResponse(school, statusCode.OK));
    } catch (error) {
      console.error('Error delete school', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createSchool, listSchools, getSchool, updateSchool, deleteSchool,
};

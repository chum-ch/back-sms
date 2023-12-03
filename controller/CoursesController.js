/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const statusCode = require('../utils/statusCode');
const Service = require('./Service');

const listCourses = async function listCourses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const courseCollection = await db.cnListCollection();
      const courses = await db.cnListItems(req, courseCollection.courses, { SCHOOLS_ID: req.params.schoolId });
      // const courses = await db.cnDeleteAllItem(req, courseCollection.courses);
      resolve(Service.successResponse(courses, statusCode.OK));
    } catch (error) {
      console.log('Error list courses', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createCourse = async function createCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.SCHOOLS_ID = req.params.schoolId;
      const courseCollection = await db.cnListCollection();
      const course = await db.cnInsertOneItem(req, courseCollection.courses);
      resolve(Service.successResponse(course, statusCode.CREATED));
    } catch (error) {
      console.log('Error create course', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getCourse = async function getCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnGetItem(req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      console.log('Error get course', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateCourse = async function updateCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnUpdateOneItem(req, req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      console.log('Error update course', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteCourse = async function deleteCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnDeleteOneItem(req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      console.log('Error delete course', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createCourse, listCourses, getCourse, updateCourse, deleteCourse,
};

/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listCourses = async function listCourses(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const courseCollection = await db.cnListCollection();
      const courses = await db.cnListItems(req, courseCollection.courses, { SCHOOLS_ID: req.params.schoolId });
      // const courses = await db.cnDeleteAllItem(req, courseCollection.courses);
      resolve(Service.successResponse(courses, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createCourse = async function createCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      if (!input.Name) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Course name is required.',
        });
      } else if (!input.Credit) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Credit is required.',
        });
      }
      req.body.SCHOOLS_ID = req.params.schoolId;
      req.query = {
        SCHOOLS_ID: req.params.schoolId,
        Name: input.Name,
      };
      const { data: [existingCourse] } = await listCourses(req);
      if (!existingCourse) {
        req.body = input;
        const courseCollection = await db.cnListCollection();
        const course = await db.cnInsertOneItem(req, courseCollection.courses);
        resolve(Service.successResponse(course, statusCode.CREATED));
      } else {
        resolve(Service.successResponse(existingCourse, statusCode.CREATED));
      }
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getCourse = async function getCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnGetItem(req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateCourse = async function updateCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnUpdateOneItem(req, req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteCourse = async function deleteCourse(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.cnDeleteOneItem(req.params.courseId);
      resolve(Service.successResponse(course, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createCourse, listCourses, getCourse, updateCourse, deleteCourse,
};

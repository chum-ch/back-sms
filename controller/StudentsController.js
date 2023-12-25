/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../submodule/handle-error/index');
const Service = require('./Service');

const listStudents = async function listStudents(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const studentCollection = await db.cnListCollection();
      const students = await db.cnListItems(req, studentCollection.students, { GENERATIONS_ID: req.params.generationId });
      // const students = await db.cnDeleteAllItem(req, studentCollection.students);
      resolve(Service.successResponse(students, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateStudent = async function updateStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnUpdateOneItem(req, req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const listStudentsUnderSchool = async function listStudentsUnderSchool(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionDB = await db.cnListCollection();
      const students = await db.cnListItems(req, collectionDB.students, { SCHOOLS_ID: req.params.schoolId });
      if (students && students.length > 0) {
        for (let indexStudent = 0; indexStudent < students.length; indexStudent += 1) {
          const student = students[indexStudent];
          req.query = { GENERATIONS_ID: student.GENERATIONS_ID };
          const [getGeneration] = await db.cnListItems(req, collectionDB.generations);
          students[indexStudent].GenerationName = getGeneration.Name;
        }
      }
      // const students = await db.cnDeleteAllItem(req, studentCollection.students);
      resolve(Service.successResponse(students, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const uploadImage = async function uploadImage(req) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.file) {
        throw ({ ErrorMessage: 'Image not found.' });
      } else {
        // Generate the image URL
        req.body = { ProfileURL: `${process.env.LOCAL_URL}:${process.env.PORT}/${req.file.filename}` };
        const student = await updateStudent(req);
        resolve(Service.successResponse(student.data, statusCode.CREATED));
      }
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createStudent = async function createStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      req.body = { ...req.body, GENERATIONS_ID: req.params.generationId, SCHOOLS_ID: req.params.schoolId };
      const studentCollection = await db.cnListCollection();
      const student = await db.cnInsertOneItem(req, studentCollection.students);
      resolve(Service.successResponse(student, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getStudent = async function getStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnGetItem(req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteStudent = async function deleteStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnDeleteOneItem(req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  uploadImage,
  listStudentsUnderSchool,
};

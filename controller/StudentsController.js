/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const statusCode = require('../utils/statusCode');
const Service = require('./Service');

const listStudents = async function listStudents(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const studentCollection = await db.cnListCollection();
      const students = await db.cnListItems(req, studentCollection.students, { GENERATIONS_ID: req.params.generationId });
      // const students = await db.cnDeleteAllItem(req, studentCollection.students);
      resolve(Service.successResponse(students, statusCode.OK));
    } catch (error) {
      console.log('Error list students', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
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
      console.log('Error list students under school', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
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
      console.log('Error create student', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
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
      console.log('Error create student', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getStudent = async function getStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnGetItem(req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      console.log('Error get student', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateStudent = async function updateStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnUpdateOneItem(req, req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      console.log('Error update student', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteStudent = async function deleteStudent(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.cnDeleteOneItem(req.params.studentId);
      resolve(Service.successResponse(student, statusCode.OK));
    } catch (error) {
      console.log('Error delete student', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
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

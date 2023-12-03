/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listStudents = async function listStudents(req, res) {
  try {
    const students = await API.StudentsController.listStudents(req);
    // const students = await db.cnDeleteAllItem(req, studentCollection.students);
    res.status(students.StatusCode).send(students.data);
  } catch (error) {
    console.log('API error list students', error);
    res.status(error.StatusCode).send(error);
  }
};
const listStudentsUnderSchool = async function listStudentsUnderSchool(req, res) {
  try {
    const students = await API.StudentsController.listStudentsUnderSchool(req);
    res.status(students.StatusCode).send(students.data);
  } catch (error) {
    console.log('API error list students under school', error);
    res.status(error.StatusCode).send(error);
  }
};

const uploadImage = async function uploadImage(req, res) {
  try {
    const student = await API.StudentsController.uploadImage(req);
    res.status(student.StatusCode).send(student.data);
  } catch (error) {
    console.log('API error create student', error);
    res.status(error.StatusCode).send(error);
  }
};
const createStudent = async function createStudent(req, res) {
  try {
    const student = await API.StudentsController.createStudent(req);
    res.status(student.StatusCode).send(student.data);
  } catch (error) {
    console.log('API error create student', error);
    res.status(error.StatusCode).send(error);
  }
};

const getStudent = async function getStudent(req, res) {
  try {
    const student = await API.StudentsController.getStudent(req);
    res.status(student.StatusCode).send(student.data);
  } catch (error) {
    console.log('API error get student', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateStudent = async function updateStudent(req, res) {
  try {
    const student = await API.StudentsController.updateStudent(req);
    res.status(student.StatusCode).send(student.data);
  } catch (error) {
    console.log('API error update student', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteStudent = async function deleteStudent(req, res) {
  try {
    const student = await API.StudentsController.deleteStudent(req);
    res.status(student.StatusCode).send(student.data);
  } catch (error) {
    console.log('API error delete student', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createStudent, listStudents, getStudent, updateStudent, deleteStudent, uploadImage, listStudentsUnderSchool,
};

/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listCourses = async function listCourses(req, res) {
  try {
    const courses = await API.CoursesController.listCourses(req);
    // const courses = await db.cnDeleteAllItem(req, courseCollection.courses);
    res.status(courses.StatusCode).send(courses.data);
  } catch (error) {
    console.log('API error list courses', error);
    CustomError.send(res, error);
  }
};

const createCourse = async function createCourse(req, res) {
  try {
    const course = await API.CoursesController.createCourse(req);
    res.status(course.StatusCode).send(course.data);
  } catch (error) {
    console.log('API error create course', error);
    CustomError.send(res, error);
  }
};

const getCourse = async function getCourse(req, res) {
  try {
    const course = await API.CoursesController.getCourse(req);
    res.status(course.StatusCode).send(course.data);
  } catch (error) {
    console.log('API error get course', error);
    CustomError.send(res, error);
  }
};

const updateCourse = async function updateCourse(req, res) {
  try {
    const course = await API.CoursesController.updateCourse(req);
    res.status(course.StatusCode).send(course.data);
  } catch (error) {
    console.log('API error update course', error);
    CustomError.send(res, error);
  }
};

const deleteCourse = async function deleteCourse(req, res) {
  try {
    const course = await API.CoursesController.deleteCourse(req);
    res.status(course.StatusCode).send(course.data);
  } catch (error) {
    console.log('API error delete course', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createCourse, listCourses, getCourse, updateCourse, deleteCourse,
};

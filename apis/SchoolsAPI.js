/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listSchools = async function listSchools(req, res) {
  try {
    const schools = await API.SchoolsController.listSchools(req);
    res.status(schools.StatusCode).send(schools.data);
  } catch (error) {
    console.error('API List school error', error);
    res.status(error.StatusCode).send(error.data);
  }
};

const createSchool = async function createSchool(req, res) {
  try {
    const school = await API.SchoolsController.createSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.error('API Error create school', error);
    CustomError.send(res, error);
  }
};

const getSchool = async function getSchool(req, res) {
  try {
    const school = await API.SchoolsController.getSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.error('API Error get school', error);
    CustomError.send(res, error);
  }
};

const updateSchool = async function updateSchool(req, res) {
  try {
    const school = await API.SchoolsController.updateSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.error('API Error update school', error);
    CustomError.send(res, error);
  }
};

const deleteSchool = async function deleteSchool(req, res) {
  try {
    const school = await API.SchoolsController.deleteSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.error('API Error delete school', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createSchool, listSchools, getSchool, updateSchool, deleteSchool,
};

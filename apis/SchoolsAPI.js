/* eslint-disable no-console */
const API = require('../controller/index');

const listSchools = async function listSchools(req, res) {
  try {
    const schools = await API.SchoolsController.listSchools(req);
    res.status(schools.StatusCode).send(schools.data);
  } catch (error) {
    console.log('API List school error', error);
    res.status(error.StatusCode).send(error.data);
  }
};

const createSchool = async function createSchool(req, res) {
  try {
    const school = await API.SchoolsController.createSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.log('API Error create school', error);
    res.status(error.StatusCode).send(error);
  }
};

const getSchool = async function getSchool(req, res) {
  try {
    const school = await API.SchoolsController.getSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.log('API Error get school', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateSchool = async function updateSchool(req, res) {
  try {
    const school = await API.SchoolsController.updateSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.log('API Error update school', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteSchool = async function deleteSchool(req, res) {
  try {
    const school = await API.SchoolsController.deleteSchool(req);
    res.status(school.StatusCode).send(school.data);
  } catch (error) {
    console.log('API Error delete school', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createSchool, listSchools, getSchool, updateSchool, deleteSchool,
};

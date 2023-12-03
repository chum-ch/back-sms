/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');

const listGenerations = async function listGenerations(req, res) {
  try {
    const generations = await API.GenerationsController.listGenerations(req);
    res.status(generations.StatusCode).send(generations.data);
  } catch (error) {
    console.log('API error list generation', error);
    res.status(error.StatusCode).send(error);
  }
};

const createGeneration = async function createGeneration(req, res) {
  try {
    const generation = await API.GenerationsController.createGeneration(req);
    res.status(generation.StatusCode).send(generation.data);
  } catch (error) {
    console.log('API error create generation', error);
    res.status(error.StatusCode).send(error);
  }
};

const getGeneration = async function getGeneration(req, res) {
  try {
    const generation = await API.GenerationsController.getGeneration(req);
    res.status(generation.StatusCode).send(generation.data);
  } catch (error) {
    console.log('API error get generation', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateGeneration = async function updateGeneration(req, res) {
  try {
    const generation = await API.GenerationsController.updateGeneration(req);
    res.status(generation.StatusCode).send(generation.data);
  } catch (error) {
    console.log('API error update generation', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteGeneration = async function deleteGeneration(req, res) {
  try {
    const generation = await API.GenerationsController.deleteGeneration(req);
    res.status(generation.StatusCode).send(generation.data);
  } catch (error) {
    console.log('API error delete generation', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createGeneration, listGenerations, getGeneration, updateGeneration, deleteGeneration,
};

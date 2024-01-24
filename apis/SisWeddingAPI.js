/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { CustomError } = require('../submodule/handle-error/index');

const listSisWedding = async function listSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.listSisWedding(req);
    // const wedding = await db.cnDeleteAllItem(req, roomCollection.wedding);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error list wedding', error);
    CustomError.send(res, error);
  }
};

const createSisWedding = async function createSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.createSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error create wedding', error);
    CustomError.send(res, error);
  }
};
const uploadSisWedding = async function uploadSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.uploadSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error upload wedding', error);
    CustomError.send(res, error);
  }
};
const downloadSisWedding = async function downloadSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.downloadSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error download wedding', error);
    CustomError.send(res, error);
  }
};

const getSisWedding = async function getSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.getSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error get wedding', error);
    CustomError.send(res, error);
  }
};

const updateSisWedding = async function updateSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.updateSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error update wedding', error);
    CustomError.send(res, error);
  }
};

const deleteSisWedding = async function deleteSisWedding(req, res) {
  try {
    const wedding = await API.SisWeddingController.deleteSisWedding(req);
    res.status(wedding.StatusCode).send(wedding.data);
  } catch (error) {
    console.log('API error delete wedding', error);
    CustomError.send(res, error);
  }
};

module.exports = {
  createSisWedding, listSisWedding, getSisWedding, updateSisWedding, deleteSisWedding, uploadSisWedding, downloadSisWedding,
};

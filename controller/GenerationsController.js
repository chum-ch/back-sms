/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const Service = require('./Service');
const db = require('../submodule/mongodb/mongodb');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');

const listGenerations = async function listGenerations(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionDB = await db.cnListCollection();
      const generations = await db.cnListItems(req, collectionDB.generations, { SCHOOLS_ID: req.params.schoolId });
      if (generations && generations.length > 0) {
        for (let indexGeneration = 0; indexGeneration < generations.length; indexGeneration += 1) {
          const generation = generations[indexGeneration];
          req.query = { GENERATIONS_ID: generation.GENERATIONS_ID };
          const listStudents = await db.cnListItems(req, collectionDB.students);
          generations[indexGeneration].StudentNumber = listStudents.length;
          generations[indexGeneration].MaleTotals = listStudents.filter((student) => student.Gender.Value === 'Male').length;
          generations[indexGeneration].FemaleTotals = listStudents.filter((student) => student.Gender.Value === 'Female').length;
        }
      }
      resolve(Service.successResponse(generations, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createGeneration = async function createGeneration(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const input = req.body;
      if (!input.Name) {
        throw new CustomError({
          key: KeyError.InputValidation,
          message: 'Generation name is required.',
        });
      }
      req.body.SCHOOLS_ID = req.params.schoolId;
      req.query = {
        SCHOOLS_ID: req.params.schoolId,
        Name: input.Name,
      };
      const { data: [existingGeneration] } = await listGenerations(req);
      if (!existingGeneration) {
        req.body = input;
        const generationCollection = await db.cnListCollection();
        const generation = await db.cnInsertOneItem(req, generationCollection.generations);
        resolve(Service.successResponse(generation, statusCode.OK));
      } else {
        resolve(Service.successResponse(existingGeneration, statusCode.CREATED));
      }
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const getGeneration = async function getGeneration(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const generation = await db.cnGetItem(req.params.generationId);

      resolve(Service.successResponse(generation, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateGeneration = async function updateGeneration(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const generation = await db.cnUpdateOneItem(req, req.params.generationId);
      resolve(Service.successResponse(generation, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteGeneration = async function deleteGeneration(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const generation = await db.cnDeleteOneItem(req.params.generationId);
      resolve(Service.successResponse(generation, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

module.exports = {
  createGeneration, listGenerations, getGeneration, updateGeneration, deleteGeneration,
};

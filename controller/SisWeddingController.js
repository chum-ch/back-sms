/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { UploadFile } = require('../utils/utils');
const { statusCode, CustomError, KeyError } = require('../submodule/handle-error/index');
const sisWeddingRule = require('../schemas/SisWeddingRules.json');
const Service = require('./Service');

const listSisWedding = async function listSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { wedding } = await db.cnListCollection();
      const sisWedding = await db.cnListItems(req, wedding);
      // const wedding = await db.cnDeleteAllItem(req, {sisWedding}.wedding);
      resolve(Service.successResponse(sisWedding, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const createSisWedding = async function createSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { wedding } = await db.cnListCollection();
      const sisWedding = await db.cnInsertOneItem(req, wedding);
      resolve(Service.successResponse(sisWedding, statusCode.CREATED));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const uploadSisWedding = async function uploadSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { ErrorColumnHeaders, ErrorRows } = UploadFile.validateExcel(req, sisWeddingRule);
      if ((ErrorColumnHeaders && ErrorColumnHeaders.length > 0)
        || (ErrorRows && ErrorRows.length > 0)
      ) {
        resolve(Service.successResponse({ ErrorColumnHeaders, ErrorRows }, statusCode.BAD_REQUEST));
      } else {
        const { progresses } = await db.cnListCollection();
        const sheetData = UploadFile.readExcelFile(req, sisWeddingRule);
        const dataFromExcel = UploadFile.getDataAfterValidateExcel(sheetData);
        req.body = {
          Total: dataFromExcel.length,
        };
        const progress = await db.cnInsertOneItem(req, progresses);
        for (let index = 0; index < dataFromExcel.length; index += 1) {
          const sisWeddingData = dataFromExcel[index];
          sisWeddingData.PROGRESSES_ID = progress.PROGRESSES_ID;
          req.body = sisWeddingData;
          await createSisWedding(req);
        }
        resolve(Service.successResponse(progress, statusCode.CREATED));
      }
    } catch (error) {
      console.log('Error create room', error);
      reject(Service.rejectResponse(error));
    }
  });
};
const downloadSisWedding = async function downloadSisWedding() {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(Service.successResponse(sisWeddingRule, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
const getSisWedding = async function getSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const sisWedding = await db.cnGetItem(req.params.sisWeddingId);
      resolve(Service.successResponse(sisWedding, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const updateSisWedding = async function updateSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const sisWedding = await db.cnUpdateOneItem(req, req.params.sisWeddingId);
      resolve(Service.successResponse(sisWedding, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};

const deleteSisWedding = async function deleteSisWedding(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const sisWedding = await db.cnDeleteOneItem(req.params.sisWeddingId);
      resolve(Service.successResponse(sisWedding, statusCode.OK));
    } catch (error) {
      reject(Service.rejectResponse(error));
    }
  });
};
module.exports = {
  createSisWedding,
  listSisWedding,
  getSisWedding,
  updateSisWedding,
  deleteSisWedding,
  uploadSisWedding,
  downloadSisWedding,
};

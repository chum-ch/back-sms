/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable no-console */
const db = require('../submodule/mongodb/mongodb');
const { statusCode } = require('../utils/utils');
const Service = require('./Service');

const listUsers = async function listUsers(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCollection = await db.cnListCollection();
      const users = await db.cnListItems(req, userCollection.users);
      resolve(Service.successResponse(users, statusCode.OK));
    } catch (error) {
      console.log('Error list users', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const loginUser = async function loginUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCollection = await db.cnListCollection();
      const users = await db.cnListItems(req, userCollection.users, { Email: req.body.Email.toLowerCase() });
      if (users.length === 0) {
        throw ({ message: `Email ${req.body.Email.toLowerCase()} is not found.` });
      } else if (users.length > 0 && users.find((item) => item.Password !== req.body.Password)) {
        throw ({ message: 'Password is wrong.' });
      } else {
        resolve(Service.successResponse(users, statusCode.OK));
      }
    } catch (error) {
      console.log('Error login user', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const createUser = async function createUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCollection = await db.cnListCollection();
      const user = await db.cnInsertOneItem(req, userCollection.users);
      resolve(Service.successResponse(user, statusCode.CREATED));
    } catch (error) {
      console.log('Error create user', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const getUser = async function getUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.cnGetItem(req.params.user_id);
      resolve(Service.successResponse(user, statusCode.OK));
    } catch (error) {
      console.log('Error list users', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const updateUser = async function updateUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.cnUpdateOneItem(req, req.params.user_id);
      resolve(Service.successResponse(user, statusCode.OK));
    } catch (error) {
      console.log('Error list users', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

const deleteUser = async function deleteUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.cnDeleteOneItem(req.params.user_id);
      resolve(Service.successResponse(user, statusCode.OK));
    } catch (error) {
      console.log('Error list users', error);
      reject(Service.rejectResponse(error, statusCode.SERVER_ERROR));
    }
  });
};

module.exports = {
  createUser, listUsers, getUser, updateUser, deleteUser, loginUser,
};

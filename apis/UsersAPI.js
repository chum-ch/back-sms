/* eslint-disable max-len */
/* eslint-disable no-console */
const API = require('../controller/index');
const { statusCode } = require('../utils/utils');
const db = require('../submodule/mongodb/mongodb');

const listUsers = async function listUsers(req, res) {
  try {
    const users = await API.UsersController.listUsers(req);
    res.status(users.StatusCode).send(users.data);
  } catch (error) {
    console.log('Error list users', error);
    res.status(error.StatusCode).send(error);
  }
};

const loginUser = async function loginUser(req, res) {
  try {
    const users = await db.cnListItems(req, userCollection.users, { Email: req.body.Email.toLowerCase() });
    if (users.length === 0) {
      res.status(statusCode.NOT_FOUND).send({ message: `Email ${req.body.Email.toLowerCase()} is not found.` });
    } else if (users.length > 0 && users.find((item) => item.Password !== req.body.Password)) {
      res.status(statusCode.NOT_FOUND).send({ message: 'Password is wrong.' });
    } else {
      res.status(statusCode.OK).send(users);
    }
  } catch (error) {
    console.log('Error login user', error);
    res.status(error.StatusCode).send(error);
  }
};

const createUser = async function createUser(req, res) {
  try {
    const user = await db.cnInsertOneItem(req, userCollection.users);
    res.status(statusCode.CREATED).send(user);
  } catch (error) {
    console.log('Error create user', error);
    res.status(error.StatusCode).send(error);
  }
};

const getUser = async function getUser(req, res) {
  try {
    const user = await db.cnGetItem(req.params.user_id);
    res.status(statusCode.OK).send(user);
  } catch (error) {
    console.log('Error list users', error);
    res.status(error.StatusCode).send(error);
  }
};

const updateUser = async function updateUser(req, res) {
  try {
    const user = await db.cnUpdateOneItem(req, req.params.user_id);
    res.status(statusCode.OK).send(user);
  } catch (error) {
    console.log('Error list users', error);
    res.status(error.StatusCode).send(error);
  }
};

const deleteUser = async function deleteUser(req, res) {
  try {
    const user = await db.cnDeleteOneItem(req.params.user_id);
    res.status(statusCode.OK).send(user);
  } catch (error) {
    console.log('Error list users', error);
    res.status(error.StatusCode).send(error);
  }
};

module.exports = {
  createUser, listUsers, getUser, updateUser, deleteUser, loginUser,
};

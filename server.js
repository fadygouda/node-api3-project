const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter.js')
const server = express();
                      

server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use(logger);    

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`${req.method} ${req.url} at ${time}`);
  next();
}

module.exports = server;

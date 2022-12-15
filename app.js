const express = require('express');
const bodyParser = require('body-parser')
const app = express();



  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


const Google = require('./route/google.route')
app.use ('/api/v1/Google', Google)

const Wiki = require('./route/wiki.route')
app.use ('/api/v1/Wiki', Wiki)

module.exports = app; 
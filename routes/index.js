require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
/* GET home page. */
router.get('/list', function(req, res, next) {
  knex('people').select().then(function(people){
    res.json({ title: 'Express', peeps: people })
  })
});
router.post('/list', function(req, res, next) {
  knex('people').insert({name: req.body.name, description: req.body.description}).returning('*').then(function(people){
    res.json({ title: 'Express', peeps: people })
  })
});

module.exports = router;

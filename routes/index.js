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

router.delete('/list/:id', function(req, res, next) {
  knex('people').where({id: req.params.id}).del().returning('id').then(function(person){
    res.json({ title: 'Deleted', person: person })
  })
});

router.post('/list/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(req.body);
  knex('people').where({id: req.params.id}).update({name: req.body.name, description: req.body.description}).returning('*').then(function(person){
    res.json({ title: 'Updated', person: person })
  })
});

module.exports = router;

'use strict';

var r = require('rethinkdb');
var _ = require('lodash');
var logger = require('../../lib/logger');
var db = require('../../lib/database');


module.exports = {
  add_drug: add_drug,
  get_drugs: get_drugs,
  delete_drug: delete_drug
};


function add_drug(req, res) {

  var drug = req.swagger.params.drug.value;
  logger.info('drug insert POST received', {origin: req.headers.origin}, {drug: drug}, {user: drug.username});
  r.db('medical').table('drugs').insert({ drug }).run(db.getConnection(), function(err) {
    if (err) {
      logger.error('Error inserting drug', {origin: req.headers.origin}, {err: err}, {user: drug.username});
      res.status(500).json('internal server error')
    } else {
      res.status(200).json('success')
    }
  });

}

function get_drugs(req, res) {
  if (req.swagger.params.limit.value) {
    // r.db('medical').table('drugs').orderBy('date').limit(req.swagger.params.limit.value).run(db.getConnection(), callback)
  }

  logger.info('getAllDrugs GET received', {origin: req.headers.origin});
  r.db('medical').table('drugs').run(db.getConnection(), function(err, cursor) {
    if (err) {
      logger.error('Error inserting drug', {origin: req.headers.origin}, {err: err}, {user: drug.username});
      res.status(500).json('internal server error')
    } else {
      cursor.toArray(function(err, results) {
        if (err) res.status(500).json('internal server error')
        res.status(200).json(results);
      });
    }
  });

}

function delete_drug(req, res) {

  var drugId = req.swagger.params.id.value.drugId;
  console.log('THE DRUG ID IS: ' + drugId);
  r.db('medical').table('drugs').get(drugId).delete().run(db.getConnection(), function(err) {
    if (err) {
      logger.error('Error deleting drug', {origin: req.headers.origin}, {err: err});
      res.status(500).json('internal server error')
    } else {
      logger.info('Deleting drug from database', {origin: req.headers.origin});
      res.status(200).json('success');
    }
  });

}

'use strict';

var r = require('rethinkdb');
var _ = require('lodash');
var logger = require('../../lib/logger');
var db = require('../../lib/database');


module.exports = {
  add_drug: add_drug
};


function add_drug(req, res) {

  var drug = req.swagger.params.drug.value;
  logger.info('drug insert POST received', {origin: req.headers.origin}, {drug: drug}, {user: drug.username});
  r.db('medical').table('drugs').insert({ drug }).run(db.getConnection());
  res.json('success');

}

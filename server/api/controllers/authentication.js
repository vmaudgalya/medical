'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var r = require('rethinkdb');
var _ = require('lodash');
var logger = require('../../lib/logger');
var db = require('../../lib/database');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  authdoc: authdoc,
  logout: logout
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function authdoc(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var username = req.swagger.params.user.value.username;
  var password = req.swagger.params.user.value.password;
  var doctor = {username, password};
  var isAuthorized = false;

  logger.info('authentication request received', {origin: req.headers.origin}, {user: doctor});

  r.db('medical').table('doctors').filter(r.row('username').eq(username).and(r.row('password').eq(password)))
    .run(db.getConnection(), function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, results) {
        if (err) throw err;
        if (results.length > 0) isAuthorized = true;
        if (isAuthorized) {
          logger.info('user authenticated', {origin: req.headers.origin}, {user: doctor});
        } else {
          logger.info('user failed to authenticate', {origin: req.headers.origin}, {user: doctor});
        }
        res.json(JSON.stringify({username: username, isAuthorized: isAuthorized}));
    });
  });


  // this sends back a JSON response which is a single string
  // res.json(message);
}

function logout(req, res) {
  var username = req.swagger.params.username.value;
  logger.info('user logout', {user: username});
  res.json('user logged out');
}

var r = require('rethinkdb');
var connection = null;

r.connect( {host: 'localhost', port: 28016}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

module.exports.getConnection = function() {
  return connection;
}

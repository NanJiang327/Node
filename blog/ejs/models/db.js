var setting = require('../setting');
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connetction,
    Server = require('mongodb').Server;
module.exports = new Db(setting.db, new Server(setting.host, Connection.DEFAULT_PORT, {}));

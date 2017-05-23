let mongoose = require("mongoose");
let config = require("./config.js");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://maxim:123987bonus@ds139761.mlab.com:39761/webportalkozakgroup');

module.exports = mongoose;


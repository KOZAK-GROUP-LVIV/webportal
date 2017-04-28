let mongoose = require("mongoose");
let config = require("./config.js");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.url);

module.exports = mongoose;


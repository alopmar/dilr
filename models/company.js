/*
 * Category
 *
 * @module      :: Model
 * @description :: Represent the data model for Companies
 * @author      :: Antonio López Martínez
 * */

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var Company  = new Schema({

  name:  {
    type        : String,
    require     : true
  },

  description : {
    type        :String,
    require     : false
  },

  created     : {
    type        : Date,
    default     : Date.now
  },

  modified    : {
    type        : Date,
    default     : Date.now
  }
});

module.exports = mongoose.model('Company', Company);

/*
 * Category
 *
 * @module      :: Model
 * @description :: Represent the data model for Categories
 * @author      :: Antonio López Martínez
 * */

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var Category  = new Schema({

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

module.exports = mongoose.model('Category', Category);

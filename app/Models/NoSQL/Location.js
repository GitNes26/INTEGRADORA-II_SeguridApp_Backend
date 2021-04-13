'use strict'
 
const mongoose = use('Mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongooseLeanGetters = require('mongoose-lean-getters');

const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/seguridapp');
autoIncrement.initialize(connection);
 
let locationSchema = mongoose.Schema({
  // reg: { type: Number, default: '', requiered: true, unique: true },
  // id: { type: String, default: '', requiered: true, unique: true, uppercase: true },
  name: { type: String, default: '', requiered: true },
  user_id: { type: Number, default: '', requiered: true }
},{
  timestamps: true
})

// falta hacer unique pero con user|name

locationSchema.plugin(mongooseLeanGetters, autoIncrement.plugin,{
  model: 'Location',
  field: 'reg',
  startAt: 1,
  incrementBy: 1
})
 
module.exports = mongoose.model('Location', locationSchema)

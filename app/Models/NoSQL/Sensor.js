'use strict'
 
const mongoose = use('Mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseAutoPopulate = require('mongoose-autopopulate')

const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/seguridapp');
autoIncrement.initialize(connection);
 
let sensorSchema = mongoose.Schema({
  // reg: { type: Number, default: '', requiered: true, unique: true },
  id: { type: String, default: '', requiered: true, uppercase: true },
  name: { type: String, default: '', requiered: true },
  pin: { type: Number, default: '', requiered: true},
  location: { type: ObjectId, ref:'Location', autopopulate: true},
  user_id: { type: Number, default: '', requiered: true },
  description: { type: String, default: '', requiered: true }
},{
  timestamps: true
})

// falta hacer unique pero con user|id && user|name && user|pin

sensorSchema.plugin(mongooseLeanGetters, mongooseAutoPopulate, autoIncrement.plugin,{
  model: 'Sensor',
  field: 'reg',
  startAt: 1,
  incrementBy: 1
})
 
module.exports = mongoose.model('Sensor', sensorSchema)
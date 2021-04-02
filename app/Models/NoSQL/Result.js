'use strict'
 
const mongoose = use('Mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongooseLeanGetters = require('mongoose-lean-getters');

const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed
 
var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/seguridapp');
autoIncrement.initialize(connection);

let resultSchema = mongoose.Schema({
  // reg: { type: Number, default: '', requiered: true, unique: true },
  sensor: { type: Number, default: '', requiered: true },
  data: { type: Mixed, default: '', requiered: true}
},{
  timestamps: true
})

resultSchema.plugin(mongooseLeanGetters, autoIncrement.plugin,{
  model: 'Result',
  field: 'reg',
  startAt: 1,
  incrementBy: 1
})

module.exports = mongoose.model('Result', resultSchema)

'use strict'

class HumidityController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onMessage(data){
    var datito;
    this.socket.broadcast("message",data);
    console.log(this.socket.id);
    console.log(data);
    const user = await this.auth.getUser();
    const sensore = await Sensor.findOne({name:"Humumedad"},{user_id:user.id});
    const idsensor = sensore._id
    const Obj = {
      "sensor_id":idsensor,
      "usuario_id":user.id,
      "Data":data
    }
    if(data != datito){
    const dato = new Resultado(Obj);
    dato.save();
    datito  = data;
    }
  }

  onClose () {
    this.socket.on('close')
  }

  onError () {
    this.socket.on('error')
  }
}

module.exports = HumidityController

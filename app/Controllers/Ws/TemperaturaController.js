'use strict'

class TemperaturaController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage(data){
    this.socket.broadcast("message",data);
    console.log(this.socket.id);
    console.log(data);
  }
}

module.exports = TemperaturaController

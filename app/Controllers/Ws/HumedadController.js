'use strict'

class HumedadController {
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

module.exports = HumedadController

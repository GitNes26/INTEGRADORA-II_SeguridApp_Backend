'use strict'

const ResultController = require("../app/Controllers/Ws/ResultController")

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('tempData', 'ResultController')
Ws.channel('humData','ResultController')
Ws.channel('pirData','ResultController')
Ws.channel('ultraData','ResultController')

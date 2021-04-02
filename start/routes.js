'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('register', 'UserController.store')
Route.post('login', 'Auth/AuthController.login')

Route.group(() => { 
  Route.get('perfil', 'UserController.show'),
  Route.put('user', 'UserController.update'),
  Route.delete('user', 'UserController.destroy')
 }).middleware(['auth'])

 //SENSORS
 Route.group(() => { 
  Route.post('sensor', 'SensorController.store')
  Route.get('sensor', 'SensorController.showMySensors')
  Route.get('monitoring/:locationParam', 'SensorController.showMySensorsByLocation')
  Route.put('sensor/:id', 'SensorController.update')
  Route.delete('sensor/:id', 'SensorController.destroy')
}).middleware(['auth'])

//LOCATIONS
Route.group(() => { 
  Route.post('location', 'LocationController.store')
  Route.get('location', 'LocationController.showMyLocations')
  Route.put('location/:name', 'LocationController.update')
  Route.delete('location/:name', 'LocationController.destroy')
}).middleware(['auth'])
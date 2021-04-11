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

Route.post('api/register', 'UserController.store')
Route.post('api/login', 'Auth/AuthController.login')

Route.group(() => { 
  Route.get('/api/profile', 'UserController.show'),
  Route.put('/api/user', 'UserController.update'),
  Route.delete('/api/user', 'UserController.destroy')
 }).middleware(['auth'])

 //SENSORS
 Route.group(() => { 
  Route.post('/api/sensor', 'SensorController.store')
  Route.get('/api/sensor', 'SensorController.showMySensors')
  Route.get('/api/monitoring/:locationParam', 'SensorController.showMySensorsByLocation')
  Route.put('/api/sensor/:id', 'SensorController.update')
  Route.delete('/api/sensor/:id', 'SensorController.destroy')
}).middleware(['auth'])

//LOCATIONS
Route.group(() => { 
  Route.post('/api/location', 'LocationController.store')
  Route.get('/api/location', 'LocationController.showMyLocations')
  Route.put('/api/location/:_id', 'LocationController.update')
  Route.delete('/api/location/:name', 'LocationController.destroy')
}).middleware(['auth'])
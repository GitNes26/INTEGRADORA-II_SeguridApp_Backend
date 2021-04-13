'use strict'

const Sensor = use('App/Models/NoSQL/Sensor')

class SensorController {
    async store({response, auth}) {
        const user = await auth.getUser()

        const newSensor = 
            {'user_id':user.id, 'name' : 'Temp&Hum', 'description' : 'Sensor que captura la temperatura y el porcentaje de humedad conectado al pin 1.'}
        const sensor = new Sensor(newSensor)
        await sensor.save()
        const newSensor2 = 
            {'user_id':user.id, 'name' : 'Movimiento', 'description' : 'Sensor PIR conectado al pin 2.'}
        const sensor2 = new Sensor(newSensor2)
        await sensor2.save()
        const newSensor3 = 
            {'user_id':user.id, 'name' : 'Distancia', 'description' : 'Sensor Ultrasonico conectado al pin 3 y 4.'}
        const sensor3 = new Sensor(newSensor3)
        await sensor3.save()
        const newSensor4 = 
            {'user_id':user.id, 'name' : 'LED', 'description' : 'Led RGB conectado al pin 5.'}            
        const sensor4 = new Sensor(newSensor4)
        await sensor4.save()

        const sensors = [sensor,sensor2,sensor3,sensor4]
        return response.status(200).json(sensors)
    }

    async showMySensors({ response, auth }) {
        const user = await auth.getUser()
        const mySensors = await Sensor.find({'user_id':user.id}).lean()
        // console.log(mySensors[0].name)

        if (mySensors == 0) return response.status(400).json({message:'Sensores no encontrados'})
        return response.status(200).json(mySensors)
    }
}

module.exports = SensorController

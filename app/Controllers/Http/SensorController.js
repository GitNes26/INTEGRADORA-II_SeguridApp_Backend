'use strict'

const Sensor = use('App/Models/NoSQL/Sensor')

class SensorController {
    async store({response, auth}) {
        const user = await auth.getUser()
        // const user = user

        const newSensor = 
            {'user_id':user.id, 'name' : 'Temperatura', 'description' : 'Sensor que captura la temperatura.'}
        const sensor = new Sensor(newSensor)
        await sensor.save()
        const newSensor2 = 
            {'user_id':user.id, 'name' : 'Humedad', 'description' : 'Sensor que captura el porcentaje de humedad.'}            
        const sensor2 = new Sensor(newSensor2)
        await sensor2.save()
        const newSensor3 = 
            {'user_id':user.id, 'name' : 'Distancia', 'description' : 'Sensor Ultrasonico, indica la distancia.'}
        const sensor3 = new Sensor(newSensor3)
        await sensor3.save()
        const newSensor4 = 
            {'user_id':user.id, 'name' : 'Movimiento', 'description' : 'Sensor PIR, captura si hay movimiento, acompañado de un LED.'}
        const sensor4 = new Sensor(newSensor4)
        await sensor4.save()

        const sensors = [sensor,sensor2,sensor3,sensor4]
        return response.status(200).json(sensors)
    }

    async showMySensors({ response, auth }) {
        const user = await auth.getUser()
        const mySensors = await Sensor.find({'user_id':user.id}).lean()
        // console.log(mySensors[0].name)

        // if (mySensors == 0) return response.status(400).json({message:'Sensores no encontrados'})
        return response.status(200).json(mySensors)
    }

    async deleteByUser({ response, auth }) {
        const user = await auth.getUser()
        await Sensor.deleteMany({user_id:user.id})

        return response.json({message: "los sensores del usuario "+user.name+" fueron eliminados"})
    }

    async showSensor({ response, auth, params:{name}}) {
        const user = await auth.getUser()
        const sensor = await Sensor.findOne({user_id:user.id, name:name}).lean()
        return response.status(200).json(sensor)
    }
}

module.exports = SensorController

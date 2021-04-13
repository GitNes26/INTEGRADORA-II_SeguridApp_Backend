'use strict'

const Sensor = use('App/Models/NoSQL/Sensor')
const Location = use('App/Models/NoSQL/Location')

class SensorController {
    async store({request, response, auth}) {
        const user = await auth.getUser()

        const newSensor = {
            'id' : request.input('id'),
            'name' : request.input('name'),
            'pin' : request.input('pin'),
            'location' : request.input('location'),
            'user_id' : user.id,
            'description' : request.input('description')
        }
        const sensor = new Sensor(newSensor)
        await sensor.save()
        return response.status(200).json(sensor)
    }

    async showMySensors({ response, auth }) {
        const user = await auth.getUser()
        const mySensors = await Sensor.find({'user_id':user.id}).populate('location')
        // const location = await Location.findOne({'user_id':user.id}).lean()
        // console.log(mySensors[0].location.name)

        // if (error) return response.status(500).json({message:'hubo un error:',error})
        if (mySensors == 0) return response.status(404).json({message:'Producto no encontrado'})
        return response.status(200).json(mySensors)
    }

    async showMySensorsByLocation({ response, auth, params:{locationParam}}) {
        const user = await auth.getUser()
        const location = await Location.findOne({'name':locationParam}).lean()
        // console.log(location.name, location.id)
        if (location == 0) return response.status(404).json({message:'Localidad no encontrado'})

        const sensors = await Sensor.find({'user_id':user.id, 'location':location._id})

        return response.status(200).json(sensors)
    }

    async update({request, response, auth, params:{id}}) {
        const user = await auth.getUser()

        // const newId = request.input('id')
        // const newName = request.input('name')
        const newLocation = request.input('location')
        const newDescription = request.input('description')
        const sensor = await Sensor.findOneAndUpdate({'user_id':user.id, 'id':id},{'location':newLocation, 'description':newDescription})
        // await Sensor.updateOne({'id':id, 'user_id':user.id},{$set:{'id':newId,'name':newName, 'location_id':newLocation}})
       
        return response.status(200).json({message:`Sensor ${sensor.name} modificado`}) 
    }

    async destroy({response, auth, params:{id}}){
        const user = await auth.getUser()
        
        const sensor = await Sensor.findOne({'user_id':user.id, 'id':id}).lean()
        await Sensor.deleteOne({'_id':sensor._id})

        return response.status(200).json({message:`El sensor ${sensor.name} ha sido eliminado`})  
        
    }
}

module.exports = SensorController

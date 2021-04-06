'use strict'

const Location = use('App/Models/NoSQL/Location')

class LocationController {
    async store({request, response, auth}){
        const user = await auth.getUser()

        const newLocation = {
            // 'id' : request.input('id'),
            'name' : request.input('name'),
            'user_id' : user.id
        }
        const location = new Location(newLocation)
        await location.save()
        return response.status(200).json(location)
    }

    async showMyLocations({ response, auth }) {
        const user = await auth.getUser()
        const myLocations = await Location.find({'user_id':user.id})

        return response.status(200).json(myLocations)
    }

    async update({request, response, params:{name}, auth}) {
        const user = await auth.getUser()

        const newName = request.input('name')
        await Location.findOneAndUpdate({'user_id':user.id, 'name':name},{'name':newName})
        
        return response.status(200).json({message:'Sensor modificado'})
    }

    async destroy({response, auth, params:{name}}) {
        const user = await auth.getUser()

        const location = await Location.findOne({'name':name, 'user_id':user.id}).lean()
        await Location.deleteOne({'name':location.name})

        return response.status(200).json({message:'Sesnor eliminado'})
    }
}

module.exports = LocationController

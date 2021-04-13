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

    async update({request, response, params:{_id}, auth}) {
        const user = await auth.getUser()

        const newName = request.input('name')
        await Location.findOneAndUpdate({'user_id':user.id, '_id':_id},{'name':newName})
        
        return response.status(200).json({message:'Locacion modificado'})
    }

    async destroy({response, auth, params:{_id}}) {
        const user = await auth.getUser()

        const location = await Location.findOne({'_id':_id, 'user_id':user.id}).lean()
        await Location.deleteOne({'_id':location._id}) // "sad67as567d6a"  || {_id:"sad67as567d6a"}

        return response.status(200).json({message:'Locacion eliminado'})
    }
}

module.exports = LocationController

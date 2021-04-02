'use strict'

const User = use('App/Models/User')

class UserController {
    async store({request, response}){
        const userData = request.all()
        const user = await User.create(userData)

        return response.created({
            status: true,
            data: user,
        })
    }

    async show({response, auth}) {
        const session = await auth.getUser()
        const user = await User.findBy('id',session.id)
        return response.status(200).json({user:user})
    }

    async update({request, response, auth}){
        const session = await auth.getUser()

        const cel = request.input('cel')
        const age = request.input('age')
        const email = request.input('email')
        const password = request.input('password')

        const user = await User.find(session.id)
        
        user.cel = cel
        user.age = age
        user.email = email
        user.password = password

        await user.save()
        
        return response.status(200).json({user:user})
    }

    async destroy({auth, response}){
        const user = await auth.getUser()
        
        await user.delete()
        return response.status(200).json({message:'Usuario eliminado'})
    }
}

module.exports = UserController

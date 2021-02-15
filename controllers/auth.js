const {response} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res) => {

    const {email, password} = req.body

    try {

        const usuario = await Usuario.findOne({email})

        if (!usuario) {
            
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        if (!usuario.state) {
            
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        
        if (!validPassword) {
            
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        //Genero mi token
        const token = await generateJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

const googleLogin = async (req, res) => {

    const {id_token} = req.body

    try {

        //Verifica usuario de google
        const {name, email, img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({email})

        if (!usuario) {
            //Tengo que crearlo
            const data =  {
                name, 
                email,
                password: ':P',
                img
            }

            usuario = new Usuario(data)
        }

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'El usuario con el que intenta ingresar se encuentra bloqueado. Hable con el administrador'
            })
        }

        //Genero mi token
        const token = await generateJWT(usuario.id)

        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        
        res.status(400).json({
            msg: 'Google token no válido'
        })
    }
}

module.exports = {
    login,
    googleLogin,
}
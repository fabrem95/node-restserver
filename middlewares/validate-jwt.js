const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('token')

    if (!token) {
        
        return res.status(401).json({
            msg: 'Token no encontrado'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET)

        const usuario = await Usuario.findById(uid)

        //Verificar si el usuario no esta eliminado
        if (!usuario || !usuario.state) {
            return res.status(401).json({
                msg: 'Token no válido'
            })
        }

        req.usuario = usuario
        
        next();
    } catch (error) {

        res.status(401).json({
            msg: error
        })
    }
}

module.exports = {
    validateJWT
}
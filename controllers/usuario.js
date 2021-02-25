const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const {Usuario} = require('../models')

const getUser = async (req, res) => {

    const { limit = 5, from = 0 } = req.query
    const filter = {state: true};

    [total, usuarios] = await Promise.all([

        Usuario.countDocuments(filter),
        Usuario.find(filter)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
}

const createUser = async (req, res) => {

    const {name, email, password, role} = req.body;
    const usuario = new Usuario({ name, email, password, role })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en Base de Datos
    await usuario.save()

    res.json({
        ok: true,
        usuario
    })
}

const modUser = async (req, res) => {

    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body

    if (password) {

        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.json({
        usuario
    })
}

const deleteUser = async (req, res) => {
    
    let {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {state: false})

    res.json({
        usuario,
        auth: req.usuario
    })
}

module.exports = {
    getUser,
    createUser,
    modUser,
    deleteUser,
}
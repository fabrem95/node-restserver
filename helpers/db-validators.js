const Role = require('../models/role')
const Usuario = require('../models/usuario')

const checkLogin = async (email) => {

    const existEmail = await Usuario.findOne({email})
    //const correctPassword = await Usuario.findOne({})
    console.log(existEmail)

    if (!existEmail) {
        throw new Error(`Email o contraseña incorrectos`)
    }
}

const isValidEmail = async (email = '') => {

    const existEmail = await Usuario.findOne({email});

    if (existEmail) {
        throw new Error(`Ya existe una cuenta con el e-mail ${email}`)
    }
}

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role})

    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`)
    }
}

const isValidUserId = async (id) => {

    const existUserId = await Usuario.findById(id);

    if (!existUserId) {
        throw new Error(`No existe usuario con el id ${id}`)
    }
}

const validateState = async (id) => {

    const isStateTrue = await Usuario.find({_id: id, state: true});

    if (!isStateTrue || isStateTrue.length == 0) {
        throw new Error('El usuario que desea eliminar no existe')
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    isValidUserId,
    validateState,
    checkLogin,
}

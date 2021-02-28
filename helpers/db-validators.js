const { Usuario, Categoria, Producto, Role } = require('../models')

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

const isValidCollection = async ( collection = '', validCollections = [] ) => {

    const includesCollection = validCollections.includes(collection)

    if (!includesCollection) {
        throw new Error(`${collection} no es una colección válida - ${validCollections}`)
    }
    return true
}

const isValidUserId = async (id) => {

    const existUserId = await Usuario.findById(id);

    if (!existUserId) {
        throw new Error(`No existe usuario con el id ${id}`)
    }
}

const isValidCategoryId = async (id) => {

    const existCategoryId = await Categoria.findById(id);

    if (!existCategoryId) {
        throw new Error(`No existe categoria con el id ${id}`)
    }
}

const isValidProductId = async (id) => {

    const existProductId = await Producto.findById(id);

    if (!existProductId) {
        throw new Error(`No existe producto con el id ${id}`)
    }
}

const validateUserState = async (id) => {

    const isStateTrue = await Usuario.find({_id: id, state: true});

    if (!isStateTrue || isStateTrue.length == 0) {
        throw new Error('El usuario que desea eliminar no existe')
    }
}

const validateCategoryState = async (id) => {

    const isStateTrue = await Categoria.find({_id: id, state: true});

    if (!isStateTrue || isStateTrue.length == 0) {
        throw new Error('La categoria que desea eliminar no existe')
    }
}

const validateProductState = async (id) => {

    const isStateTrue = await Producto.find({_id: id, state: true});

    if (!isStateTrue || isStateTrue.length == 0) {
        throw new Error('El producto que desea eliminar no existe')
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    isValidCollection,
    isValidUserId,
    isValidCategoryId,
    isValidProductId,
    validateUserState,
    validateCategoryState,
    validateProductState,
    checkLogin,
}

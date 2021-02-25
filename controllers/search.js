const { response } = require("express");
const { ObjectId } = require('mongoose').Types

const {
    Usuario, 
    Categoria,
    Producto
} = require('../models')

const validCollections = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
]

const searchUsers = async(description = '', res) => {

    const isMongoId = ObjectId.isValid(description)

    if (isMongoId) {
        
        const usuario = await Usuario.findById(description)

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(description, 'i')

    const usuarios = await Usuario.find({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    })

    return res.json({
        results: (usuarios) ? [usuarios] : []
    })
}

const searchCategories = async(description = '', res) => {

    const isMongoId = ObjectId.isValid(description)

    if (isMongoId) {
        
        const categoria = await Categoria.findById(description)

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(description, 'i')

    const categorias = await Categoria.find({ name: regex , state: true})

    return res.json({
        results: (categorias) ? [categorias] : []
    })
}

const searchProducts = async(description = '', res) => {

    const isMongoId = ObjectId.isValid(description)

    if (isMongoId) {
        
        const producto = await Producto.findById(description)

        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(description, 'i')

    const productos = await Producto.find({ name: regex, state: true })

    return res.json({
        results: (productos) ? [productos] : []
    })
}

const search = (req, res = response) => {

    const { collection, description } = req.params;

    if (!validCollections.includes(collection)) {
        
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${validCollections}`
        })
    }

    switch (collection) {
        case 'categorias':
            searchCategories(description, res)
            break;

        case 'productos':
            searchProducts(description, res)
            break;

        case 'usuarios':
            searchUsers(description, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se te olvido hacer la busqueda'
            })
            break;
    }
}

module.exports = {
    search
};
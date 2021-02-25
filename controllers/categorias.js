const {response, request} = require('express')

const { Categoria } = require('../models')

const getCategories = async (req, res) => {

    const { limit = 5, from = 0 } = req.query

    const [total, categorias] = await Promise.all([

        Categoria.countDocuments(),
        Categoria.find()
            .populate('usuario')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categorias
    })
}

const getCategoryById = async (req, res) => {

    const { id } = req.params

    const categoria = await Categoria.findById(id).populate('usuario')

    res.json({
        categoria
    })
}

const createCategory = async (req, res) => {

    const {name} = req.body;

    const categoriaDB = await Categoria.findOne({name});

    if(categoriaDB) {

        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    }

    const data = {
        name,
        usuario: req.usuario._id
    }

    //Guardar en Base de Datos
    const categoria = new Categoria(data)

    await categoria.save()

    res.json({
        ok: true,
        categoria
    })
}

const modCategory = async (req, res) => {

    const { id } = req.params
    const { _id, name } = req.body

    const categoriaDB = await Categoria.findOne({name});

    if(categoriaDB) {

        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id, {name});

    res.json({
        categoria
    })
}

const deleteCategory = async (req, res) => {
    
    let {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, {state: false})

    res.json({
        categoria,
        auth: req.usuario
    })
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    modCategory,
    deleteCategory
}
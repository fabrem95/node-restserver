const {response, request} = require('express')

const { Producto } = require('../models')

const getProducts = async (req, res) => {

    const { limit = 5, from = 0 } = req.query

    const [total, productos] = await Promise.all([

        Producto.countDocuments(),
        Producto.find()
            .populate('usuario')
            .populate('categoria')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        productos
    })
}

const getProductById = async (req, res) => {

    const { id } = req.params

    const producto = await Producto.findById(id)
        .populate('usuario')
        .populate('categoria')

    res.json({
        producto
    })
}

const createProduct = async (req, res) => {

    const {name, price, categoryId} = req.body;

    const productoDB = await Producto.findOne({name});

    if(productoDB) {

        return res.status(400).json({
            msg: `El producto ${name} ya existe`
        })
    }

    const data = {
        name,
        price,
        usuario: req.usuario._id,
        categoria: categoryId
    }

    //Guardar en Base de Datos
    const producto = new Producto(data)

    await producto.save()

    res.json({
        ok: true,
        producto
    })
}

const modProduct = async (req, res) => {

    const { id } = req.params
    const { state, usuario, categoria, ...data } = req.body

    const productoDB = await Producto.findOne({name: data.name});

    if(productoDB) {

        return res.status(400).json({
            msg: `El producto ${data.name} ya existe`
        })
    }

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.json({
        producto
    })
}

const deleteProduct = async (req, res) => {
    
    let {id} = req.params

    const producto = await Producto.findByIdAndUpdate(id, {state: false})

    res.json({
        producto,
        auth: req.usuario
    })
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    modProduct,
    deleteProduct
}
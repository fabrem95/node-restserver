const {response}    = require('express')
const path          = require('path')
const fs            = require('fs')

const {Usuario, Producto} = require('../models')

const {uploadFileAndReturnName} = require('../helpers') 

const uploadFile = async (req, res = response) => {

    const {file} = req.files

    try {
        const fileName = await uploadFileAndReturnName(file, undefined)
    
        res.json({
            fileName
        })
    } catch (error) {

        res.status(400).json({
            error
        });
    }
}

const updatePic = async (req, res = response) => {

    const {id, collection} = req.params
    const {file} = req.files

    let model;

    switch (collection) {
        case 'usuarios':
            
            model = await Usuario.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe usuario con el id: ${id}`
                })
            }
            break;

        case 'productos':
            
            model = await Producto.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe producto con el id: ${id}`
                })
            }
            break;
        
        default:
            res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
            break;
    }

    //Limpiar imagenes previas
    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img)

        if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg)
    }

    const fileName = await uploadFileAndReturnName(file, undefined, collection)
    model.img = fileName 

    await model.save()

    res.json({
        model
    })
}

const getImg = async (req, res = response) => {

    const {id, collection} = req.params

    let model;

    switch (collection) {
        case 'usuarios':
            
            model = await Usuario.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe usuario con el id: ${id}`
                })
            }
            break;

        case 'productos':
            
            model = await Producto.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe producto con el id: ${id}`
                })
            }
            break;
        
        default:
            res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
            break;
    }

    if (!model.img) {

        const noImgFoundPath = path.join(__dirname, '../assets', 'no-image.jpg')
        
        return res.sendFile(noImgFoundPath)
    }

    const pathImg = path.join(__dirname, '../uploads', collection, model.img)

    res.sendFile(pathImg)
}

module.exports = {
    uploadFile,
    updatePic,
    getImg
}
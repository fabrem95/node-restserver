const { response, request } = require('express')

const checkFile = (req = request, res = response, next) => {

    const {file} = req.files ? req.files : []
    
    //Chequear que exista el archivo
    if (!file || Object.keys(file).length === 0 || !req.files.file) {
        res.status(400).json({msg: 'No hay archivos en la peticion'});
        return;
    }

    next()
}

module.exports = {
    checkFile
}
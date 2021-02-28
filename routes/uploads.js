const {Router} = require('express');
const { check } = require('express-validator');

const { uploadFile, updatePic, getImg } = require('../controllers/uploads');

const { isValidCollection } = require('../helpers');

const { validateFields, checkFile } = require('../middlewares');

const router = Router()

//Rutas
router.post('/', 
    checkFile, 
    validateFields, 
uploadFile)

router.put('/:collection/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['usuarios', 'productos'] )),
    checkFile,
    validateFields,
updatePic)

router.get('/:collection/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['usuarios', 'productos'] )),
    validateFields,
getImg)

module.exports = router;
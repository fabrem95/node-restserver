const {Router} = require('express');
const { check } = require('express-validator');

const { 
    getProducts, 
    getProductById,
    createProduct,
    modProduct,
    deleteProduct,
} = require('../controllers/productos');

const { 
    isValidProductId, 
    validateProductState
} = require('../helpers');

const {
    validateFields, 
    validateJWT, 
    checkAdminRole, 
    hasRole
} = require('../middlewares')

const router = Router()

//=========================================
//Rutas
//=========================================
router.get('/', getProducts)

router.get('/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidProductId),
    validateFields,
getProductById)

router.post('/', 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields, 
createProduct)

router.put('/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidProductId),
    validateFields,
modProduct)

router.delete('/:id', 
    validateJWT,
    checkAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidProductId), 
    check('id').custom(validateProductState), 
    validateFields,
deleteProduct)

module.exports = router;
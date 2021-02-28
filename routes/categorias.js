const {Router} = require('express');
const { check } = require('express-validator');

const { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    deleteCategory,
    modCategory
} = require('../controllers/categorias');

const { 
    validateCategoryState, 
    isValidCategoryId, 
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
router.get('/', getCategories)

router.get('/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidCategoryId),
    validateFields,
getCategoryById)

router.post('/', 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('state', 'El estado es obligatorio').not().isEmpty(),
    validateFields, 
createCategory)

router.put('/:id',
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidCategoryId),
    validateFields,
modCategory)

router.delete('/:id', 
    validateJWT,
    checkAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidCategoryId), 
    check('id').custom(validateCategoryState), 
    validateFields,
deleteCategory)

module.exports = router;
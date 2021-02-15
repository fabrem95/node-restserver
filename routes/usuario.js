//Importaciones
//=========================================
const {Router} = require('express');
const { check } = require('express-validator');

const {
    validateFields, 
    validateJWT, 
    checkAdminRole, 
    hasRole
} = require('../middlewares')

const { isValidRole, 
        isValidEmail, 
        isValidUserId,
        validateState
    } = require('../helpers/db-validators');

const { getUser,
        createUser,
        modUser,
        deleteUser,
    } = require('../controllers/usuario');


const router = Router()

//=========================================
//Rutas
//=========================================
router.get('/', getUser)

//createUser
router.post('/', 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(), 
    check('email').custom(isValidEmail),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min:6 }), 
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields, 
createUser)

router.put('/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId),
    validateFields,
modUser)

router.delete('/:id', 
    validateJWT,
    checkAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId), 
    check('id').custom(validateState), 
    validateFields,
deleteUser)

module.exports = router;
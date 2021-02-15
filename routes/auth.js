const {Router} = require('express');
const { check } = require('express-validator');

const { 
    login, 
    googleLogin } = require('../controllers/auth');

const { checkLogin } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

//Rutas
router.post('/login',
    check('email', 'Debe ingresar el correo').isEmail(), 
    check('password', 'Debe ingresar la contraseña').not().isEmpty(), 
    validateFields,
login)

router.post('/google-login',
    check('id_token', 'El id_token es necesario').not().isEmpty(), 
    validateFields,
googleLogin)

//Configuraciones de google

module.exports = router;
const validateFields    = require('../middlewares/validate-fields')
const validateFiles     = require('../middlewares/validate-files')
const validateJWT       = require('../middlewares/validate-jwt');
const validateRoles     = require('../middlewares/validate-roles');

module.exports = {
    ...validateFields,
    ...validateFiles,
    ...validateJWT,
    ...validateRoles
}
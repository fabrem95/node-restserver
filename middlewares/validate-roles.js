const { response } = require("express");

const checkAdminRole = (req, res = response, next) => {
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const {role} = req.usuario

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Debe ser administrados para realizar esta tarea'
        })
    }

    next();
}

const hasRole = (...roles) => {

    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Rol de usuario no válido - Roles válidos ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    checkAdminRole,
    hasRole,
}
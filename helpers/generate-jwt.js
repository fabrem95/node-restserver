const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {

    return new Promise((res, rej) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: "7d"
        }, (err, token) => {

            if (err) {

                console.log(err)
                rej('No se pudo generar el token')
            } else {

                res(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}
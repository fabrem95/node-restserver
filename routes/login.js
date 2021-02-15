const express = require('express')

require('../config/config')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/usuario');

const app = express()

app.post('/login', (req, res) => {

    body = req.body

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        } 

        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {expiresIn: process.env.VENC_TOKEN});

        res.json({

            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

//Configuraciones de google
async function verifyGoggleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google-login', async (req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verifyGoggleToken(token)
        .catch(err => {

            return res.status(400).json({
                ok: false,
                err
            })
        })

    Usuario.findOne({email: googleUser.email}, (err, usuarioDB) => {
        
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        
        //Si el usuario no existe en la BD
        if (!usuarioDB) {

            let usuario = new Usuario();

            usuario.name = googleUser.name
            usuario.email = googleUser.email
            usuario.img = googleUser.img
            usuario.google = true
            usuario.password = ':)'

            usuario.save((err, usuarioDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {expiresIn: process.env.VENC_TOKEN});

                return res.json({
                    ok: true,
                    usuarioCreado: usuarioDB,
                    token
                })
            })
        }

        //Si el usuario si existe en la BD
        if (usuarioDB) {
            
            //Si ya se habia registrado por medio tradicional
            if (usuarioDB.google == false) {
                
                return res.json({
                    ok: false,
                    err: 'Email ya existente, debe usar su autentificacion normal'
                })
            
            //Si ya se habia registrado por google
            } else {

                let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {expiresIn: process.env.VENC_TOKEN});

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        }
    })
})

module.exports = app;
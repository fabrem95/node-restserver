require('dotenv').config()

const Server = require("./models/server");

const server = new Server();

server.listen();



// require('./config/config')

// const mongoose = require('mongoose');
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express()

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())

// // Habilitar carpeta public
// app.use(express.static(path.resolve(__dirname, '../public')))

// // Global Routes
// app.use(require('./routes/index'))

// //Connect database
// mongoose.connect(process.env.urlDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false} ,(err, res) => {
//     if (err) throw err;

//     console.log('Base de datos Online');
// })

// app.listen(process.env.PORT, () => {
//     console.log('Escuchando puerto ', process.env.PORT);
// })
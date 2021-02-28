const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //Conectar Base de Datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        this.routes();
    }

    //Database
    async conectarDB() {

        await dbConnection()
    }

    //Middlewares
    middlewares(){

        //CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Carpeta Publica
        this.app.use(express.static('public'))

        //Subida de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    //Rutas
    routes() {

        this.app.use('/auth', require('../routes/auth'))
        this.app.use('/categorias', require('../routes/categorias'))
        this.app.use('/productos', require('../routes/productos'))
        this.app.use('/search', require('../routes/search'))
        this.app.use('/usuarios', require('../routes/usuario'))
        this.app.use('/uploads', require('../routes/uploads'))
    }

    //Puerto
    listen() {

        this.app.listen(this.port, () => {

            console.log('Escuchando puerto', this.port);
        })
    }
}

module.exports = Server
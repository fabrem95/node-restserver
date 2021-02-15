const mongoose = require('mongoose');

const dbConnection = async() => {

try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: false
        })
        
        console.log('Base de datos Online');
    } catch (error) {
        
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports = {
    dbConnection,
}
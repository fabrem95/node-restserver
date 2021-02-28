const { Schema, model } = require('mongoose') 

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String
    }, 
    role: {
        type: String,
        required: [true, 'El rol es necesario'],
        default: 'CLIENT_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE', 'CLIENT_ROLE'],
            message: '{VALUE} no es un rol valido'
        }
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {

    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id 

    return user
}

module.exports = model('Usuario', usuarioSchema)
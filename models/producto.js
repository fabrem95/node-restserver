const {Schema, model} =  require('mongoose')

const productoSchema = Schema ({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    state:  {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId, 
        ref: 'Categoria',
        required: true
    }
})

productoSchema.methods.toJSON = function() {

    const {__v, state, ...data} = this.toObject();

    return data
}

module.exports = model('Producto', productoSchema)
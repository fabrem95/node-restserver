const {Schema, model} =  require('mongoose')

const categoriaSchema = Schema ({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
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
    }
})

categoriaSchema.methods.toJSON = function() {

    const {__v, state, ...data} = this.toObject();

    return data
}

module.exports = model('Categoria', categoriaSchema)
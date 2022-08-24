import mongoose from 'mongoose'

const proyectosSchema = mongoose.Schema({
  nombre:{
    type: String,
    trim: true,
    required: true,
  },
  apellidos:{
    type: String,
    trim: true,
    required: true,
  },
  nick:{
    type: String,
    trim: true,
    required: true,
  },
  birthdate:{
    type: Date,
    default: Date.now(),
    required: true,
  },
    color1:{
    type: String,
    required: true
  },
  color2:{
    type: String,
    required: true
  },
  color3:{
    type: String,
    required: true
  },
  magicNumber:{
    type: String,
    required: true
  },
  img:{
    data: Buffer,
    contentType: String
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  fecha:{
    type: Date,
    default: Date.now(),
    required: true
  },
},
{
  timestamps: true,
})

const Proyecto = mongoose.model('Proyecto', proyectosSchema)

export default Proyecto
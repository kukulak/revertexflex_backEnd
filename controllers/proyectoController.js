import Proyecto from '../models/Proyecto.js'
// import multer from 'multer'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';


// // UPLOADS
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// const upload = multer({ storage: storage });



const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
  res.json(proyectos)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id

  // proyecto.img = {
  //   data: fs.readFileSync(path.join(__dirname + '/uploads/' + 'req.file.filename')),
  //   contentType: 'image/png'
  // }

  try{
    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado)
  }catch(error){
    console.log(error)
  }
}

const obtenerProyecto = async (req, res) => {
  const { id } = req.params
  const proyecto = await Proyecto.findById(id)

  if(!proyecto){
    const error = new Error("No encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if(proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("Acción no valida no tienes permiso")
    return res.status(401).json({ msg: error.message })
  }

  res.json(proyecto)
}

const editarProyecto = async (req, res) => {
  const { id } = req.params
  const proyecto = await Proyecto.findById(id)

  if(!proyecto){
    const error = new Error("No encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if(proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("Acción no valida no tienes permiso")
    return res.status(401).json({ msg: error.message })
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre
  proyecto.apellidos = req.body.apellidos || proyecto.apellidos
  proyecto.nick = req.body.nick || proyecto.nick
  proyecto.birthdate = req.body.birthdate || proyecto.birthdate
  proyecto.color1 = req.body.color1 || proyecto.color1
  proyecto.color2 = req.body.color2 || proyecto.color2
  proyecto.color3 = req.body.color3 || proyecto.color3
  proyecto.magicNumber = req.body.magicNumber || proyecto.magicNumber
  proyecto.img = req.body.img || proyecto.img

  try{
    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado)
  }catch(error){
    console.log(error)
  }

}

const eliminarProyecto = async (req, res) => {
  const { id } = req.params
  const proyecto = await Proyecto.findById(id)

  if(!proyecto){
    const error = new Error("No encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if(proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("Acción no valida no tienes permiso")
    return res.status(401).json({ msg: error.message })
  }

  try{
    await proyecto.deleteOne()
    res.json({ msg: "Sculpture Deleted" })
  }catch(error){

  }
}

const agregarColaborador = async (req, res) => {}

const eliminarColaborador = async (req, res) => {}

const obtenerTareas = async (req, res) => {}

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas
}
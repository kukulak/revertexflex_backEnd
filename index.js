import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'


dotenv.config();
const app = express();
app.use(express.json());
connectDB();

//configurar cors
const whitelist = [process.env.FRONTEND_URL]
// const whitelist = ['http://localhost:8080']

const corsOptions = {
  origin: function(origin, callback){
    console.log('ORIGIN', origin)
    if(whitelist.includes(origin)){
      //Pueden 
      callback(null, true)
    }else{
      //no pueden
      callback(new Error("Error de Cors, CORS ERROR"))
    }
  }
}

app.use(cors(corsOptions))


// app.get('http://localhost:8080', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a Single Route'})
// })

// UPLOADING

// UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Routing

app.use('/api/usuarios', upload.single('image'), usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`)
});
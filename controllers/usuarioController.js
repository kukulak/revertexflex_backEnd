import Usuario from "../models/Usuario.js"
import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js'
import { emailRegistro, emailOlvidePassword, emailContacto } from '../helpers/email.js'

const register = async (req, res) => {
  //evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({email: email})
  console.log(existeUsuario)
  if(existeUsuario){
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({ msg: error.message })
  }
  try{
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    await usuario.save()

    //Enviar el mail de registro

    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })

    res.json({msg: "Usuario registrado correctamente revisa tu mail para confirmar tu cuenta"})

  }catch(error){
    console.log(error)
  }
}

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email })
  if(!usuario){
    const error = new Error("El usuario no existe")
    return res.status(404).json({ msg: error.message })
  }
  // comprobar si el usuario esta conpmoroibasp
  if(!usuario.confirmado){
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({ msg: error.message })
  }
  //comprobar Password
  if (await usuario.comprobarPassword(password)){
    res.json({
     _id: usuario._id,
     nombre: usuario.nombre,
     email: usuario.email,
     token: generarJWT(usuario._id),
    })
  } else {
    const error = new Error("El password es Incorrecto")
    return res.status(403).json({ msg: error.message })
  }
}

const confirmar = async (req, res) => {
  const { token } = req.params
  const usuarioConfirmar = await Usuario.findOne({ token })
  if(!usuarioConfirmar){
    const error = new Error("token no válido")
    return res.status(403).json({ msg: error.message })
  }
  try{
    usuarioConfirmar.confirmado = true
    usuarioConfirmar.token = ""
    await usuarioConfirmar.save()
    res.json({ msg: 'Usuario Confirmado Correctamente' })
  }catch (error) {
    console.log(error)
  }
}

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if(!usuario){
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message })
  }
  try{
    usuario.token = generarId();
    await usuario.save()

    //Enviar el email de olvido
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })

    res.json({ msg: "hemos enviado un e mail con las instrucciones" })
  }catch(error){
    console.log(error)
  }
}

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token })

  if(tokenValido) {
    res.json({ msg: "token valido y usuario existe" })
  } else {
    const error = new Error("el token no es valido")
    return res.status(404).json({msg: error.message})
  }
}

const nuevoPassword = async (req, res) => { 
  const { token } = req.params;
  const { password } = req.body;
  
  const usuario = await Usuario.findOne({ token });
  if(usuario){
    usuario.password = password
    usuario.token = ''
    try{
      await usuario.save()
      res.json({ msg: 'Password Modificado correctamente' })
    }catch(error){
      console.log(error)
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message })
  }


}

const perfil = async (req, res) => {
  const {usuario} = req
  res.json(usuario)
}


const envioCorreo = async (req, res) => {
  const { email, nombre, message } = req.body;
  
  try{
    //Enviar el email de contacto
    emailContacto({
      email: email,
      nombre: nombre,
      message: message
    })

    res.json({ msg: "Thanks for the message, we will be in touch soon" })
  }catch(error){
    console.log(error)
  }
}



export{ register, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil, envioCorreo }
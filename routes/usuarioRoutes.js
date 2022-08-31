import express from "express"
const router = express.Router();
import { register, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil, envioCorreo } from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'

// Auth , registro y confirmacion de usuarios
router.post('/', register)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.post('/contact', envioCorreo)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil', checkAuth, perfil)

export default router
import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  
  
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //informacion del mail

  const info = await transport.sendMail({
    from: '"Revertexflex - galery" <cuentas@revertexflex.com>',
    to: email,
    subject: 'Revertexflex confirma tu email',
    text: 'Confirma tu email',
    html: `<p>Hola ${nombre} comprueba tu email</p>
    <p>para crear tu cuenta para poder guardar e imprimir tu escultura personalizada</p>
    <p>Da click en el enlace
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
    </p>
    <p>Si ntu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}



export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;
  

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //informacion del mail

  const info = await transport.sendMail({
    from: '"Revertexflex - galery" <cuentas@revertexflex.com>',
    to: email,
    subject: 'Revertexfle reestablece tu password',
    text: 'reestablece tu password',
    html: `<p>Hola ${nombre} has solicitado reestablecer tu password</p>
    <p>Sigue el siguiente enlace para generar un nuevo password
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
    </p>
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `
  })
}
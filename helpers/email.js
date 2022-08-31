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
    <p>Para poder guardar e imprimir tus esculturas personalizadas</p>
    <p>Da click en el enlace
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
    </p>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
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
    subject: 'Revertexflex reestablece tu password',
    text: 'reestablece tu password',
    html: `<p>Hola ${nombre} has solicitado reestablecer tu password</p>
    <p>Sigue el siguiente enlace para generar un nuevo password
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
    </p>
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `
  })
}






export const emailContacto = async (datos) => {
  const { email, nombre, message } = datos;
  

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
    from: `REVERTEXFLEX ${nombre} ${email}`,
    to: email,
    subject: `De Revertexflex te escribió ${nombre}`,
    text: 'Mensaje desde Revertexflex',
    html: `
      <p>Te escribió:</p><span><strong>${nombre}</strong></span>
      <p>tiene este mail:</p><span><strong>${email}</strong></span>
      <p>Con este mensaje:</p>
            <p>${message}</p>
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje JAJAJA</p>
    `
  })
}
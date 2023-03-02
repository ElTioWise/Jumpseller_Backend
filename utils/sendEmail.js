const nodemailer = require('nodemailer');

enviarMail = async (data)=> {
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : 'wiseflame2016@gmail.com',
            pass : process.env.GMAIL
        }
    }
    const mensaje = {
        from : 'wiseflame2016@gmail.com',
        to : 'wiseflame2016@gmail.com',
        subject : 'Correo de pruebas',
        text : `Envío de correo desde node js utilizando nodemailer, giftcard creadas : ${data}`,
        html : `<ul><li>${data}</li></ul><img src="cid:unique@nodemailer.com"/>`,
        attachments: [
            {
                filename: 'test.png',
                path: './src/images/21_1800x1800.webp',
                cid: 'unique@nodemailer.com'
            }
        ]
    }
    const transport = nodemailer.createTransport(config)
    const info =  await transport.sendMail(mensaje);
    console.log(info)
}

module.exports = enviarMail 
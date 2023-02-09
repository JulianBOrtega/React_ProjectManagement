const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    confirmRegister : async (data) =>
    {
        const { name, email, token } = data;

        await transport.sendMail({
            from: 'ProjectManager <YourMama@ProjectManager.com>',
            to: email,
            subject: 'Confirma tu cuenta de ProjectManager',
            text: 'Confirma tu cuenta en ProjectManager',
            html: `
                <p>Hola ${name}, haz click en el siguiente enlace para verificar tu cuenta:</p>
                <a href="${process.env.URL_FRONT}/confirm/${token}">Verificar cuenta</a>
            `
        })
    },
    recoverPassword : async (data) =>
    {
        const { name, email, token } = data;

        await transport.sendMail({
            from: 'ProjectManager <YourMama@ProjectManager.com>',
            to: email,
            subject: 'Reestablecer contraseña',
            text: 'Reestablece tu contraseña',
            html: `
                <p>Hola ${name}, haz click en el siguiente enlace para reestablecer tu contraseña:</p>
                <a href="${process.env.URL_FRONT}/recoverPassword/${token}">Reestablecer contraseña</a>
            `
        })
    }
}
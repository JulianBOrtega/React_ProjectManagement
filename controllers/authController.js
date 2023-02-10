const createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const generateRandomToken = require('../helpers/generateRandomToken');
const successResponse = require('../helpers/successResponse');
const generateJWT = require('../helpers/generateJWT');

const User = require('../database/models/User');
const { confirmRegister, recoverPassword } = require('../helpers/sendEmail');

module.exports = {
    register : async (req, res) =>
    {
        const { name, email, password } = req.body

        try 
        {
            if([name, email, password].includes("") || [name, email, password].includes(undefined))
                throw createError(400, 'Todos los campos son obligatorios');

            let user = await User.findOne({ email });
            if(user) throw createError(400, "El email ya se encuentra registrado")
            
            const token = generateRandomToken();
            user = new User(req.body);
            user.token = token;

            const userStore = await user.save();
            await confirmRegister({ 
                name: user.name, 
                email: user.email, 
                token: user.token 
            });

            return successResponse(res, 201, 'Usuario registrado', userStore)
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Register');
        }
    },
    login: async (req, res) =>
    {
        const { email, password } = req.body;

        try 
        {
            if([email, password].includes("") || [email,password].includes(undefined))
                throw createError(400, "Todos los campos son obligatorios");

            let user = await User.findOne({ email });
            if(!user) throw createError(403, "Credenciales inválidas");
            if(!user.checked) throw createError(403, "Tu cuenta no ha sido verificada")
            if(!await user.checkedPassword(password)) throw createError(403, 'Credenciales inválidas')

            const returnedData = {
                name: user.name,
                user: {
                    name: user.name,
                    _id: user.id,
                },
                token: generateJWT({ id: user._id })
            }

            return successResponse(res, 200, 'Usuario logeado', returnedData)
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Login');
        }
    },
    checked: async (req, res) =>
    {
        const { token } = req.query;

        try 
        {
            if(!token) createError(400, 'Token inexistente');

            const user = await User.findOne({ token });
            if(!user) throw createError(400, 'Token inválido')
            user.checked = true;
            user.token = "";

            await user.save();

            return successResponse(res, 200, 'Usuario verificado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Checked');
        }
    },
    sendToken: async (req, res) =>
    {
        const { email } = req.body;
        try 
        {  
            if(!email || email == '' || email == undefined) 
                throw createError('Debe introducir un email');
            
            let user = await User.findOne({ email });
            if(!user) throw createError(400, 'Email no registrado');
            const token = generateRandomToken()
            user.token = token;
            await user.save();

            await recoverPassword({ 
                name: user.name, 
                email: user.email, 
                token: user.token 
            });

            return successResponse(res, 200, 'Email enviado con token para verificación')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'SendToken');
        }
    },
    verifyToken: async (req, res) =>
    {
        const { token } = req.query;

        try 
        {
            if(!token) throw createError(400, 'Token no ingresado')
            
            const user = await User.findOne({
                token
            })
            if(!user) throw createError(400, 'Token inválido')

            return successResponse(res, 200, 'Token verificado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'VerifyToken');
        }
    },
    changePassword: async (req, res) =>
    {
        const { token } = req.query;
        const { password } = req.body;
        
        try 
        {
            if(!token) throw createError(400, 'Token no ingresado')
            if(!password) throw createError(400, 'Contraseña no ingresado')
            
            const user = await User.findOne({ token })
            if(!user) throw createError(400, 'Token inválido')

            user.password = password;
            user.token = "";
            await user.save();

            return successResponse(res, 200, 'Contraseña cambiada')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'ChangePassword');
        }
    }
}
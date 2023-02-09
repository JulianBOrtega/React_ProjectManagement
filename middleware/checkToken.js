const createHttpError = require('http-errors');
const { verify } = require('jsonwebtoken');
const User = require('../database/models/User');
const errorResponse = require('../helpers/errorResponse')

module.exports = async (req, res, next) =>
{
    try 
    {
        if(!req.headers.authorization) throw createHttpError(401, 'Se requiere un token');
        
        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('name');

        next()
    } 
    catch (error) 
    {
        return errorResponse(res, error, 'CheckToken');
    }
}
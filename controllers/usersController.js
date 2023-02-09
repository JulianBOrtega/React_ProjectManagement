const errorResponse = require("../helpers/errorResponse");
const successResponse = require("../helpers/successResponse");

module.exports = {
    profile: async(req, res) =>
    {
        try 
        {
            return successResponse(res, 201, 'Perfil de usuario', req.user)
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Profile');
        }
    }
}
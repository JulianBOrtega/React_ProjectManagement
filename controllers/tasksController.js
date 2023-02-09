const errorResponse = require("../helpers/errorResponse");
const successResponse = require("../helpers/successResponse");

module.exports = {
    list : async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Lista de tareas')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'List');
        }
    },
    store: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 201, 'Tarea guardada')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Store');
        }
    },
    detail: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Detalle de la tarea')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Detail');
        }
    },
    update: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 201, 'Tarea actualizada')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Update');
        }
    },
    remove: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Tarea eliminada')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Remove');
        }
    },
    changeState: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Estado actualizado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'ChangeState');
        }
    }
}
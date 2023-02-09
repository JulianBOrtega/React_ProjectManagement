const mongoose = require('mongoose');
const errorResponse = require("../helpers/errorResponse");
const successResponse = require("../helpers/successResponse");
const Project = require('../database/models/Project');
const createHttpError = require("http-errors");

module.exports = {
    list : async (req, res) =>
    {
        try 
        {
            if(!req.user) console.log('-----------', 'user not found')

            const projects = await Project.find().where('createdBy').equals(req.user);
            return successResponse(res, 200, 'Lista de proyectos', projects)
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'List');
        }
    },
    store: async (req, res) =>
    {
        const { name, description, client, expireDate } = req.body;

        if([ name, description, client].includes("") || [ name, description, client].includes(undefined))
        {
            throw createHttpError(400, 'Nombre, descripción y cliente son obligatorios.')
        }

        if(!req.user) throw createHttpError(401, 'Error de autenticación');

        try 
        {
            const project = new Project({ name, description, client });
            if(expireDate) project.expireDate = expireDate;
            project.createdBy = req.user._id;
            const projectStored = await project.save();

            return successResponse(res, 201, 'Proyecto guardado', { project: projectStored });
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Store');
        }
    },
    detail: async (req, res) =>
    {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) throw createHttpError(400, 'ID inválido');

        try 
        {
            const project = await Project.findById(id);
            if(!project) throw createHttpError(404, 'Proyecto no encontrado')

            if(req.user._id.toString() !== project.createdBy.toString())
            {
                throw createHttpError(401, 'No tienes la autorización para ver este proyecto')
            }

            return successResponse(res, 200, 'Detalle del proyecto', project)
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Detail');
        }
    },
    update: async (req, res) =>
    {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) throw createHttpError(400, 'ID inválido')

        try 
        {
            const project = await Project.findById(id);
            if(!project) throw createHttpError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createdBy.toString())
            {
                throw createHttpError(401, 'No tienes la autorización para modificar este proyecto')
            }

            const { name, description, client, expireDate } = req.body;

            project.name = name || project.name;
            project.description = description || project.description;
            project.expireDate = expireDate || project.expireDate;
            project.client = client || project.client;

            const projectUpdated = await project.save();

            return successResponse(res, 201, 'Proyecto actualizado', { project: projectUpdated })
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Update');
        }
    },
    remove: async (req, res) =>
    {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) throw createHttpError(400, 'ID inválido')

        try 
        {
            const project = await Project.findById(id);
            if(!project) throw createHttpError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createdBy.toString())
            {
                throw createHttpError(401, 'No tienes la autorización para eliminar este proyecto')
            }

            await project.deleteOne();

            return successResponse(res, 200, 'Proyecto eliminado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'Remove');
        }
    },
    addCollaborator: async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Colaborador agregado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'AddCollaborator');
        }
    },
    removeCollaborator : async (req, res) =>
    {
        try 
        {
            return successResponse(res, 200, 'Colaborador eliminado')
        } 
        catch (error) 
        {
            return errorResponse(res, error, 'RemoveCollaborator');
        }
    }
}
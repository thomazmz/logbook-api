
import { RequestHandler } from "express";
import { RoleService } from "../../domain";

export const findAll = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    roleService.findAll()
      .then(roles => res.status(200).send(roles))
      .catch((error) => next(error))
  }
}

export const create = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    const { name, authorizations } = req.body
    roleService.create({ name, authorizations })
      .then((role) => res.status(200).send(role))
      .catch((error) => next(error))
  }
}

export const findOne = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    const id = parseInt(req.params.id)
    roleService.findById(id)
      .then((role) => res.status(200).send(role))
      .catch((error) => next(error))
  }
}

export const update = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    roleService.update({ id, name })
      .then((role) => res.status(200).send(role))
      .catch((error) => next(error))
  }
}

export const getAuthorizations = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    const id = parseInt(req.params.id)
    roleService.getAuthorizations(id)
      .then((authorizations) => res.status(200).send(authorizations))
      .catch((error) => next(error))
  }
}

export const updateAuthorizations = (roleService: RoleService): RequestHandler => {
  return (req, res, next) => {
    const id = parseInt(req.params.id)
    const authorizations = req.body
    roleService.updateAuthorizations({ id, authorizations})
      .then((role) => res.status(200).send(role.authorizations))
      .catch((error) => next(error))
  }
}
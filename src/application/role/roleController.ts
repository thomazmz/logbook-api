import { Role, RoleService, Permission } from "../../domain";
import { Request, Response } from "express";

export type RoleController = {
  findAll(request: Request, response: Response): void
  create(request: Request, response: Response): void
  findOne(request: Request, response: Response): void
  update(request: Request, response: Response): void
  getPermissions(request: Request, response: Response): void
  updatePermissions(request: Request, response: Response): void
}

export const roleControllerFactory = (roleService: RoleService): RoleController => ({

  findAll(request: Request, response: Response): void { 
    roleService.findAll()
      .then(roles => response.status(200).send(roles))
      .catch(error => response.status(500).send(error.message))
  },
  
  create(request: Request, response: Response): void {
    const { name, permissions } = request.body
    roleService.create({ name, permissions })
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => response.status(500).send(error.message))
  },

  findOne(request: Request, response: Response): void {
    const id = parseInt(request.params.id)
    roleService.findById(id)
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => response.status(500).send(error.message))
  }, 
  
  update(request: Request, response: Response): void { 
    const id = parseInt(request.params.id)
    const { name } = request.body
    roleService.update({ id, name })
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => response.status(500).send(error.message))
  },

  getPermissions(request: Request, response: Response): void {
    const id = parseInt(request.params.id)
    roleService.getPermissions(id)
      .then((permissions: Permission[]) => response.status(200).send(permissions))
      .catch((error: Error) => response.status(500).send(error.message))
  },

  updatePermissions(request: Request, response: Response): void {
    const id = parseInt(request.params.id)
    const permissions = request.body
    roleService.updatePermissions({ id, permissions})
      .then((role: Role) => response.status(200).send(role.permissions))
      .catch((error: Error) => response.status(500).send(error.message))
  }
})
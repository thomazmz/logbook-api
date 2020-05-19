import { Role, RoleService, Permission } from "../../domain";
import { Request, Response, NextFunction } from "express";

export type RoleController = {
  findAll(request: Request, response: Response, next: NextFunction): void
  create(request: Request, response: Response, next: NextFunction): void
  findOne(request: Request, response: Response, next: NextFunction): void
  update(request: Request, response: Response, next: NextFunction): void
  getPermissions(request: Request, response: Response, next: NextFunction): void
  updatePermissions(request: Request, response: Response, next: NextFunction): void
}

export const roleControllerFactory = (roleService: RoleService): RoleController => ({

  findAll(request: Request, response: Response, next: NextFunction): void { 
    roleService.findAll()
      .then(roles => response.status(200).send(roles))
      .catch((error: Error) => next(error))
  },
  
  create(request: Request, response: Response, next: NextFunction): void {
    const { name, permissions } = request.body
    roleService.create({ name, permissions })
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => next(error))
  },

  findOne(request: Request, response: Response, next: NextFunction): void {
    const id = parseInt(request.params.id)
    roleService.findById(id)
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => next(error))
  }, 
  
  update(request: Request, response: Response, next: NextFunction): void { 
    const id = parseInt(request.params.id)
    const { name } = request.body
    roleService.update({ id, name })
      .then((role: Role) => response.status(200).send(role))
      .catch((error: Error) => next(error))
  },

  getPermissions(request: Request, response: Response, next: NextFunction): void {
    const id = parseInt(request.params.id)
    roleService.getPermissions(id)
      .then((permissions: Permission[]) => response.status(200).send(permissions))
      .catch((error: Error) => next(error))
  },

  updatePermissions(request: Request, response: Response, next: NextFunction): void {
    const id = parseInt(request.params.id)
    const permissions = request.body
    roleService.updatePermissions({ id, permissions})
      .then((role: Role) => response.status(200).send(role.permissions))
      .catch((error: Error) => next(error))
  }
})
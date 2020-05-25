import { Role, RoleService, Authorization } from "../../domain";
import { Request, Response, NextFunction } from "express";

export type RoleController = {
  findAll(request: Request, response: Response, next: NextFunction): void
  create(request: Request, response: Response, next: NextFunction): void
  findOne(request: Request, response: Response, next: NextFunction): void
  update(request: Request, response: Response, next: NextFunction): void
  getAuthorizations(request: Request, response: Response, next: NextFunction): void
  updateAuthorizations(request: Request, response: Response, next: NextFunction): void
}

export const roleControllerFactory = (roleService: RoleService): RoleController => ({

  findAll(request: Request, response: Response, next: NextFunction): void { 
    roleService.findAll()
      .then(roles => response.status(200).send(roles))
      .catch((error: Error) => next(error))
  },
  
  create(request: Request, response: Response, next: NextFunction): void {
    const { name, authorizations } = request.body
    roleService.create({ name, authorizations })
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

  getAuthorizations(request: Request, response: Response, next: NextFunction): void {
    const id = parseInt(request.params.id)
    roleService.getAuthorizations(id)
      .then((authorizations: Authorization[]) => response.status(200).send(authorizations))
      .catch((error: Error) => next(error))
  },

  updateAuthorizations(request: Request, response: Response, next: NextFunction): void {
    const id = parseInt(request.params.id)
    const authorizations = request.body
    roleService.updateAuthorizations({ id, authorizations})
      .then((role: Role) => response.status(200).send(role.authorizations))
      .catch((error: Error) => next(error))
  }
})
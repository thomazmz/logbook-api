import { Permission, PermissionService } from "../../domain";
import { Request, Response, NextFunction } from "express";

export type PermissionController = {
  findAll(request: Request, response: Response, next: NextFunction): void
}

export const permissionControllerFactory = (permissionService: PermissionService): PermissionController => ({
  findAll(request: Request, response: Response, next: NextFunction): void {
    const permissions = permissionService.findAll()
      .then(permissions => response.status(200).send(permissions))
      .catch((error: Error) => next(error))
  }
})
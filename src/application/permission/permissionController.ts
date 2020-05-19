import { Permission, PermissionService } from "../../domain";
import { Request, Response } from "express";

export type PermissionController = {
  findAll(request: Request, response: Response): void
}

export const permissionControllerFactory = (permissionService: PermissionService): PermissionController => ({
  findAll(request: Request, response: Response): void {
    const permissions = permissionService.findAll()
      .then(permissions => response.status(200).send(permissions))
      .catch(error => response.status(500).send(error)) 
  }
})
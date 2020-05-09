import { Router } from 'express'
import { PermissionController } from './permissionController'

export const permissionRouterFactory = (permissionController: PermissionController): Router => {
  
  const permissionRouter = Router()
  permissionRouter.get('/', permissionController.findAll)
  
  return permissionRouter
}
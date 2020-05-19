
import { Router } from 'express'
import { RoleController } from './roleController'

export const roleRouterFactory = (roleController: RoleController): Router => {

  const roleRouter = Router()
  roleRouter.get('/', roleController.findAll)
  roleRouter.post('/', roleController.create)
  roleRouter.get('/:id', roleController.findOne)
  roleRouter.patch('/:id', roleController.update)
  roleRouter.get('/:id/permissions', roleController.getPermissions)
  roleRouter.post('/:id/permissions', roleController.updatePermissions)

  return roleRouter
}
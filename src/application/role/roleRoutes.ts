import { Router } from 'express'
import * as roleControllers from './roleControllers'

export const roleRoutes = (contextResolver: <T>(...args: any) => T): Router => {
  const roleRoutes = Router()
  roleRoutes.get('/', contextResolver(roleControllers.findAll))
  roleRoutes.post('/', contextResolver(roleControllers.create))
  roleRoutes.get('/:id', contextResolver(roleControllers.findOne))
  roleRoutes.patch('/:id', contextResolver(roleControllers.update))
  roleRoutes.get('/:id/authorizations', contextResolver(roleControllers.getAuthorizations))
  roleRoutes.put('/:id/authorizations', contextResolver(roleControllers.updateAuthorizations))
  return roleRoutes
}
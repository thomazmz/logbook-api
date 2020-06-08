import { Router } from 'express'
import * as authorizationControllers from './authorizationControllers'

export const authorizationRoutes = (contextResolver: <T>(...args: any) => T): Router => {
  const authorizationRoutes = Router()
  authorizationRoutes.get('/', contextResolver(authorizationControllers.findAll))
  return authorizationRoutes
}
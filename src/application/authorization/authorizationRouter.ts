import { Router } from 'express'
import { AuthorizationController } from './authorizationController'

export const authorizationRouterFactory = (authorizationController: AuthorizationController): Router => {
  
  const authorizationRouter = Router()
  authorizationRouter.get('/', authorizationController.findAll)
  
  return authorizationRouter
}
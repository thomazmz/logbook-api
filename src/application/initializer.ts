import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { createContainer, asFunction, InjectionMode } from 'awilix'

// Role
import { roleRouterFactory } from './role'
import { roleControllerFactory } from './role'
import { roleRepositoryFactory } from '../infrastructure'
import { roleServiceFactory } from '../domain'

// Authorization
import { authorizationNames } from './authorization'
import { authorizationRouterFactory } from './authorization'
import { authorizationControllerFactory } from './authorization'
import { authorizationRepositoryFactory } from '../infrastructure'
import { authorizationServiceFactory } from '../domain'

export async function init(port: Number = 4040) {

  // Set up awlix container
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  })

  container.register({
    roleRepository: asFunction(roleRepositoryFactory),
    roleService: asFunction(roleServiceFactory),
    roleController: asFunction(roleControllerFactory),
    roleRouter: asFunction(roleRouterFactory),
    
    authorizationRepository: asFunction(authorizationRepositoryFactory),
    authorizationService: asFunction(authorizationServiceFactory),
    authorizationController: asFunction(authorizationControllerFactory),
    authorizationRouter: asFunction(authorizationRouterFactory),
    authorizationNames: asFunction(authorizationNames)
  })

  // Setup api router
  const apiRouter = express.Router()
  apiRouter.use(bodyParser.json())
  apiRouter.use('/roles', container.resolve('roleRouter'))
  apiRouter.use('/Authorizations', container.resolve('authorizationRouter'))

  // Setup application router
  const applicationRouter = express.Router()
  applicationRouter.use('/api', apiRouter)

  // Setup application
  const application = express()
  application.use(applicationRouter)
  application.use(errorHandler)

  // Run application
  application.listen(port, () => {
    console.log(`Application successfully listen on port ${port}`)
  })
}

// Error Handling
export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  response.status(500).send(error.message);
}
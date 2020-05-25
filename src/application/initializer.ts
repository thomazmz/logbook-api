import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { createContainer, asFunction, InjectionMode } from 'awilix'

// Role
import { roleRouterFactory } from './role/roleRouter'
import { roleControllerFactory } from './role/roleController'
import { roleRepositoryFactory } from '../infrastructure'
import { roleServiceFactory } from '../domain'

// Authorization
import { authorizationRouterFactory } from './authorization/authorizationRouter'
import { authorizationControllerFactory } from './authorization/authorizationController'
import { authorizationRepositoryFactory } from '../infrastructure'
import { authorizationServiceFactory } from '../domain'
import { authorizationNames } from '../domain/authorization/authorizationService'

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
    
    AuthorizationRepository: asFunction(authorizationRepositoryFactory),
    AuthorizationService: asFunction(authorizationServiceFactory),
    AuthorizationController: asFunction(authorizationControllerFactory),
    AuthorizationRouter: asFunction(authorizationRouterFactory),
    AuthorizationNames: asFunction(authorizationNames)
  })

  // Setup api router
  const apiRouter = express.Router()
  apiRouter.use(bodyParser.json())

  apiRouter.use('/roles', container.resolve('roleRouter'))
  apiRouter.use('/Authorizations', container.resolve('AuthorizationRouter'))

  // Setup application router
  const applicationRouter = express.Router()
  applicationRouter.use('/api', apiRouter)

  const application = express()
  application.use(applicationRouter)

  // Setup error handler
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
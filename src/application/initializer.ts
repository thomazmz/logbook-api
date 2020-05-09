import express from 'express'
import bodyParser from 'body-parser'
import { createContainer, asFunction, InjectionMode } from 'awilix'

// Account
import { accountRouterFactory } from './account/accountRouter'
import { accountControllerFactory } from './account/accountController'
import { accountRepositoryFactory } from '../infrastructure'
import { accountServiceFactory } from '../domain'

// Role
import { roleRouterFactory } from './role/roleRouter'
import { roleControllerFactory } from './role/roleController'
import { roleRepositoryFactory } from '../infrastructure'
import { roleServiceFactory } from '../domain'

// Permission
import { permissionRepositoryFactory } from '../infrastructure'

export async function init(port: Number = 4040) {

  // Set up awlix container
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  })
    
  container.register({
    accountRepository: asFunction(accountRepositoryFactory),
    accountService: asFunction(accountServiceFactory),
    accountController: asFunction(accountControllerFactory),
    accountRouter: asFunction(accountRouterFactory),
    roleRepository: asFunction(roleRepositoryFactory),
    roleService: asFunction(roleServiceFactory),
    roleController: asFunction(roleControllerFactory),
    roleRouter: asFunction(roleRouterFactory),
    permissionRepository: asFunction(permissionRepositoryFactory)
  })

  // Setup api router
  const apiRouter = express.Router()
  apiRouter.use(bodyParser.json())

  // apiRouter.use('/accounts', container.resolve('accountRouter'))
  // apiRouter.use('/roles', container.resolve('roleRouter'))
  apiRouter.use('/permissions', container.resolve('permissions'))

  // Setup application router
  const applicationRouter = express.Router()
  applicationRouter.use('/api', apiRouter)

  const application = express()
  application.use(applicationRouter)

  // Run application
  application.listen(port, () => {
    console.log(`Application successfully listen on port ${port}`)
  })
}

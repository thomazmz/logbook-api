import express, { Router } from 'express'
import { contextResolver, registerContextValue } from './context'
import { authorizationRoutes, authorizationNames } from './authorization'
import { accountRoutes } from './account'
import { roleRoutes } from './role'

export const initializer = async(port: Number = 4040) => {

  registerContextValue('authorizationNames', authorizationNames)

  const apiRouter = Router()
  apiRouter.use('/roles', roleRoutes(contextResolver))
  apiRouter.use('/authorizations', authorizationRoutes(contextResolver))
  apiRouter.use('/accounts', accountRoutes(contextResolver))

  const application = express()
  application.use('/api', apiRouter)

  application.listen(port, () => {
    console.log('\n')
    console.log('============================================')
    console.log(`Application successfully listen on port ${port}`)
    console.log('============================================')
  })
}
import { Router } from 'express'
import * as accountControllers from './accountControllers'

export const accountRoutes = (contextResolver: <T>(...args: any) => T): Router => {
  const accountRoutes = Router()
  accountRoutes.post('/', contextResolver(accountControllers.create))
  accountRoutes.get('/:id', contextResolver(accountControllers.findOne))
  return accountRoutes
}
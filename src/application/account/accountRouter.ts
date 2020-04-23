
import { Router } from "express"
import { AccountController } from './accountController'

export const accountRouterFactory = (accountController: AccountController): Router => {
  
  const accountRouter = Router()
  accountRouter.post('/', accountController.create)

  return accountRouter
}
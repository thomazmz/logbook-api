
import express from 'express'
import bodyParser from 'body-parser'
import { createContainer, asFunction, InjectionMode } from 'awilix'
import { accountRouterFactory } from './account/accountRouter'
import { accountControllerFactory } from './account/accountController'
import { accountRepositoryFactory } from '../infrastructure'
import { accountServiceFactory } from '../domain'

export async function init(port: Number = 4040) {

  // Set up awlix container
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  })
    
  container.register({
    accountRepository: asFunction(accountRepositoryFactory),
    accountService: asFunction(accountServiceFactory),
    accountController: asFunction(accountControllerFactory),
    accountRouter: asFunction(accountRouterFactory)
  })

  // Setup api router
  const apiRouter = express.Router()
  apiRouter.use(bodyParser.json())

  apiRouter.use('/accounts', container.resolve('accountRouter'))

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


// application.use(bodyParser.json());

// application.get('/', async (req: Request, res: Response) => {
//   res.status(200).send('Hello World!')
// })

// application.get('/accounts/:id', async (req:Request, res: Response) => {
//   accountService.findById(parseInt(req.params.id))
//     .then(account => res.status(200).send(account))
//     .catch(err => res.status(500).send(err))
// })

// application.post('/accounts', async (req: Request, res: Response) => {
//   const { email, username, passwordLiteral } = req.body
//   accountService.create(email, username, passwordLiteral)
//     .then(account => res.status(200).send(account))
//     .catch(err => res.status(500).send(err))
// })

// application.get('/accounts', async (req: Request, res: Response) => {
//   const accounts: Account[] = await accountRepository.find({ relations: ["roles"] })
//   res.status(200).send(accounts)
// })

// application.delete('/accounts/:id', async (req: Request, res: Response) => {
//   const account: Account = await accountRepository.findOne({ where: { id: req.params.id } })
//   await accountRepository.remove(account)
//   res.status(204).send()
// })

// application.post('/accounts', async (req: Request, res: Response) => {
//   const { username, email, passwordLiteral } = req.body

//   const role: Role  = new Role('Admin')
//   roleRepository.save(role)

//   const account: Account = new Account(email, username)
//   account.setPasswordHash(passwordLiteral)
//   account.roles = [ role ]
//   await accountRepository.save(account);
  
//   res.status(200).send(account)
// })


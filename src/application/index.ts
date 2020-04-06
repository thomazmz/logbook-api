import express from 'express'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { accountRepository, roleRepository, permissionRepository } from '../infrastructure/typeOrm'
import Account from '../domain/account/Account.entity'
import Role from '../domain/role/Role.entity'
import Permission from '../domain/permissions/Permission.entity'

const application = express()

application.use(bodyParser.json());

application.get('/accounts', async (req: Request, res: Response) => {
  const accounts: Account[] = await accountRepository.find({ relations: ["roles"] })
  res.status(200).send(accounts)
})

application.get('/accounts/:id', async (req:Request, res: Response) => {
  const account: Account = await accountRepository.findOne({ where: { id: req.params.id } })
  res.status(200).send(account)
})

application.delete('/accounts/:id', async (req: Request, res: Response) => {
  const account: Account = await accountRepository.findOne({ where: { id: req.params.id } })
  await accountRepository.remove(account)
  res.status(204).send()
})

application.post('/accounts', async (req: Request, res: Response) => {
  const { username, email, passwordLiteral } = req.body

  const role: Role  = new Role('Admin')
  roleRepository.save(role)

  const account: Account = new Account(email, username)
  account.setPasswordHash(passwordLiteral)
  account.roles = [ role ]
  await accountRepository.save(account);
  
  res.status(200).send(account)
})

export function init() {
  application.listen(4040, () => {
    console.log(`Application running on port 4040!`)
  })
}
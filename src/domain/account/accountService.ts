import { AccountRepository } from "./accountRepository"
import { Account } from './account'

export type AccountService = { 
  create(email:string, username: string, passwordLiteral: string): Promise<Account>
}

export const accountServiceFactory = (accountRepository: AccountRepository): AccountService => ({

  async create(email:string, username: string, passwordLiteral: string): Promise<Account> {

    const findedByEmail = await accountRepository.findOneByEmail(email)
    if(findedByEmail) throw new Error('Email already in use.');

    const findedByUsername = await accountRepository.findOneByUsername(username)
    if(findedByUsername) throw new Error('Username already in use.');

    const account = new Account({ email, username })
    await account.setPasswordHash(passwordLiteral)
    
    return accountRepository.save(account)
  }
})
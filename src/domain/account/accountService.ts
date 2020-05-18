import { AccountRepository } from "./accountRepository"
import { Account } from './account'

export type AccountService = { 
  create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account>
  findById(id: number): Promise<Account>
}

export const accountServiceFactory = (accountRepository: AccountRepository): AccountService => ({

  async create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account> {

    const findedByEmail = await accountRepository.findOneByEmailAddress(emailAddress)
    if(findedByEmail) throw new Error('Email already in use.');

    const findedByUsername = await accountRepository.findOneByUsername(username)
    if(findedByUsername) throw new Error('Username already in use.');

    const account = new Account({ emailAddress, username })
    await account.setPasswordHash(passwordLiteral)
    
    return accountRepository.save(account)
  },

  async findById(id: number): Promise<Account> {
    const findedAccount = await accountRepository.findById(id)
    return findedAccount;
  }
})
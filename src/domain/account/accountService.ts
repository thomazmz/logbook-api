import { UnavailableEntityIdentifierError } from '../error/unavailableEntityIdentifierError'
import { AccountRepository } from "./accountRepository"
import { Account } from './account'

export type AccountService = { 
  create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account>
  findById(id: number): Promise<Account>
}

export const accountServiceFactory = (accountRepository: AccountRepository): AccountService => ({

  async create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account> {

    const findedByEmail = await accountRepository.findOneByEmailAddress(emailAddress)
    if(findedByEmail) throw new UnavailableEntityIdentifierError(Account.name, 'emailAddress', emailAddress);

    const findedByUsername = await accountRepository.findOneByUsername(username)
    if(findedByUsername) throw new UnavailableEntityIdentifierError(Account.name, 'username', username);

    const account = new Account({ emailAddress, username })
    await account.setPasswordHash(passwordLiteral)
    
    return accountRepository.save(account)
  },

  async findById(id: number): Promise<Account> {
    const findedAccount = await accountRepository.findById(id)
    return findedAccount;
  }
})
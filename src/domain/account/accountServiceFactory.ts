import { Account } from './account'
import { AccountRepository } from "./accountRepository"
import { AccountService } from './accountService'
import { Authorization } from '../authorization'
import { Role, RoleService } from '../role'
import { UnavailableEntityIdentifierError, InvalidEntityIdentifierError } from '../errors'

export const accountServiceFactory = (
  accountRepository: AccountRepository
): AccountService => ({

  async create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account> {
    const findedByEmail = await accountRepository.findOneByEmailAddress(emailAddress)
    if(findedByEmail) throw new UnavailableEntityIdentifierError(Account.name, 'email address', emailAddress);

    const findedByUsername = await accountRepository.findOneByUsername(username)
    if(findedByUsername) throw new UnavailableEntityIdentifierError(Account.name, 'username', username);

    const account = new Account({ emailAddress, username })
    await account.setPasswordHash(passwordLiteral)

    return accountRepository.save(account)
  },

  async findByStrinIdentifier(stringIdentifier: string): Promise<Account> {
    const findedByEmail = await accountRepository.findOneByEmailAddress(stringIdentifier)
    if(findedByEmail) return findedByEmail

    const findedByUsername = await accountRepository.findOneByUsername(stringIdentifier)
    if(findedByUsername) return findedByUsername

    return null;
  },

  async authenticateCredentials(stringIdentifier: string, passwordLiteral: string): Promise<string> {
    const account = await this.findByStrinIdentifier(stringIdentifier)
    if(!account) throw new Error('Invalid credentials')
    
    const passwordDoesMatch = await account.checkPassword(passwordLiteral)
    if(!passwordDoesMatch) throw new Error('Invalid credentials')

    return account.generateJwt()
  },  

  async findById(id: number): Promise<Account> {
    const findedAccount = await accountRepository.findById(id)
    if(!findedAccount) throw new InvalidEntityIdentifierError(Account.name, 'id', id)
    return findedAccount
  },

  //  async getRoles(accountId: number): Promise<Role[]> { 
  //   const findedAccount = await this.findById(accountId)
  //   return accountRepository.loadRoles(findedAccount)
  //  }

  async getRoles(accountId: number): Promise<Role[]> {
    const findedAccount = await this.findById(accountId)
    return accountRepository.loadRoles(findedAccount)
  }
})
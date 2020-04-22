import { AccountRepository } from "./accountRepository"
import { Account } from './account'

export class AccountService {

  private accountRepository: AccountRepository

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository
  }

  async create(email:string, username: string, passwordLiteral: string): Promise<Account> {

    const findedByEmail = await this.accountRepository.findOneByEmail(email)
    if(findedByEmail) throw new Error('Email already in use.');

    const findedByUsername = await this.accountRepository.findOneByUsername(username)
    if(findedByUsername) throw new Error('Username already in use.');

    const account = new Account({ email, username })
    account.setPasswordHash(passwordLiteral)

    return this.accountRepository.save(account)
  }
}
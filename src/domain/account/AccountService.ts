import { accountRepository } from '../../infrastructure'
import { Account } from '.'

export default {

  create: (email: string, username: string, passwordLiteral: string) => {
    const account = new Account( email, username)
    account.setPasswordHash(passwordLiteral)
    return accountRepository.save(account)
  },

  findById: (id: number) => {
    return accountRepository.findById(id);
  }
}
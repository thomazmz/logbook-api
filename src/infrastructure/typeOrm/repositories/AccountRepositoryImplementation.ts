import { Repository, EntityRepository } from 'typeorm'
import { Account, AccountRepository } from '../../../domain/account'
import { AccountSchema } from '../schemas/AccountSchema'

@EntityRepository(AccountSchema)
export class AccountRepositoryImplementation extends Repository<Account> implements AccountRepository {

  findById(id: number) {
    return super.findOne({ where: { id }})
  }

  someRequiredMethod(): void {
    console.log('Called some required method')
  }
}
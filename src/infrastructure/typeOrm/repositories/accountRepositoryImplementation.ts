import { AbstractRepository, EntityRepository } from 'typeorm'
import { Account, AccountRepository } from '../../../domain/account'
import { AccountSchema } from '../schemas/accountSchema'

@EntityRepository(AccountSchema)
export class AccountRepositoryImplementation extends AbstractRepository<Account> implements AccountRepository {
  
  save(account: Account): Promise<Account> {
    return this.repository.save(account)
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id }})
  }

  findByIdWithRoles(id: number) {
    return this.repository.findOne({ where: { id }, relations: [ 'roles' ]})
  }
}
import { EntityRepository, AbstractRepository } from 'typeorm'
import { Account, AccountRepository } from '../../../domain'
import { AccountSchema } from '../schemas/accountSchema'

@EntityRepository(AccountSchema)
export class TypeOrmAccountRepository extends AbstractRepository<Account> implements AccountRepository {
  save(account: Account): Promise<Account> {
    return this.repository.save(account)
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id }})
  }

  findByIdWithRoles(id: number) {
    return this.repository.findOne({ where: { id }, relations: [ 'roles' ]})
  }

  findOneByEmail(email: string): Promise<Account> {
    return this.repository.findOne({ where: { email }, relations: [ 'roles' ]})
  }

  findOneByUsername(username: string): Promise<Account> {
    return this.repository.findOne({ where: { username }, relations: [ 'roles' ]})
  }
}
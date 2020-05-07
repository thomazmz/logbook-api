import { EntityRepository, AbstractRepository } from 'typeorm'
import { Account, AccountRepository } from '../../../domain'
import { AccountSchema } from '../schemas/accountSchema'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'

@EntityRepository(AccountSchema)
export class TypeOrmAccountRepository extends TypeOrmCrudRepository<Account, number> implements AccountRepository {
  
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
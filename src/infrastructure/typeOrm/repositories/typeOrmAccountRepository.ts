import { EntityRepository, getCustomRepository } from 'typeorm'
import { Account, AccountRepository, Role } from '../../../domain'
import { AccountSchema } from '../schemas/accountSchema'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'

@EntityRepository(AccountSchema)
export class TypeOrmAccountRepository extends TypeOrmCrudRepository<Account, number> implements AccountRepository {

  findOneByEmailAddress(emailAddress: string): Promise<Account> {
    return this.repository.findOne({ where: { emailAddress }, relations: [ 'roles' ]})
  }

  findOneByUsername(username: string): Promise<Account> {
    return this.repository.findOne({ where: { username }, relations: [ 'roles' ]})
  }

  async loadRoles(account: Account): Promise<Role[]> {
    account.roles = await this.repository
      .createQueryBuilder()
      .relation(Account, 'roles')
      .of(account) 
      .loadMany()
    
    return account.roles
  }
}

export const typeOrmAccountRepositoryFactory = (): AccountRepository => {
  return getCustomRepository(TypeOrmAccountRepository)
}
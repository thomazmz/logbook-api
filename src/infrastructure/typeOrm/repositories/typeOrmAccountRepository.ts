import { EntityRepository, getCustomRepository } from 'typeorm'
import { Account, AccountRepository } from '../../../domain'
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
}

export const typeOrmAccountRepositoryFactory = (): AccountRepository => {
  return getCustomRepository<AccountRepository>(TypeOrmAccountRepository)
}
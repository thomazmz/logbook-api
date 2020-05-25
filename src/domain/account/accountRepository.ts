import { CrudRepository } from '../crud'
import { Account } from "./account"
import { Role } from '../role'

export interface AccountRepository extends CrudRepository<Account, number> {
  findOneByUsername(username: string): Promise<Account>
  findOneByEmailAddress(emailAddress: string): Promise<Account>
  loadRoles(account: Account): Promise<Role[]>
}
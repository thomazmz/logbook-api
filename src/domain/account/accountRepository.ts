import { Account } from "./account"
import { Role } from '../role'

export interface AccountRepository {
  deleteById(id: number): Promise<void>
  findAll(): Promise<Account[]>
  findById(id: number): Promise<Account>
  save(account: Account): Promise<Account>
  findOneByUsername(username: string): Promise<Account>
  findOneByEmailAddress(emailAddress: string): Promise<Account>
  loadRoles(account: Account): Promise<Role[]>
}
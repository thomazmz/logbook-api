import { Account } from "./account";

export interface AccountRepository {

  findById(id: number): Promise<Account>

  findByIdWithRoles(id: number): Promise<Account>

  findOneByEmail(email: string): Promise<Account>

  findOneByUsername(username: string): Promise<Account>

  save(account: Account): Promise<Account>
}
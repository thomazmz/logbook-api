import { Account } from "./account";

export type AccountRepository = {

  findById(id: number): Promise<Account>

  findOneByEmail(email: string): Promise<Account>

  findOneByUsername(username: string): Promise<Account>

  save(account: Account): Promise<Account>
}
import { Account } from "./account";

export type AccountRepository = {

  findById(id: number): Promise<Account>

  findOneByEmailAddress(emailAddress: string): Promise<Account>

  findOneByUsername(username: string): Promise<Account>

  save(account: Account): Promise<Account>
}
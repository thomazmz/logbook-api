import { Account } from ".";

export default interface AccountRepository {

  findById(id: number): Promise<Account>

  save(account: Account): Promise<Account>

}
import { Account } from './account'
import { Role } from '../role'

export type AccountService = { 
  create(emailAddress: string, username: string, passwordLiteral: string): Promise<Account>
  authenticateCredentials(stringIdentifier: string, passwordLiteral: string): Promise<string>
  findById(id: number ): Promise<Account>
  findByStrinIdentifier(stringIdentifier: string): Promise<Account>
  getRoles(id: number): Promise<Role[]>
}
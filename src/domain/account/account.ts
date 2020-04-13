import { Role } from '../role'

export default class Account {

  id: number

  createdAt: Date;

  updatedAt: Date;

  username: string

  email: string

  passwordHash: string

  roles: Role[];

  constructor(attributes: Partial<Account>) {
    Object.assign(this, attributes);
  }

  setPasswordHash (passwordLiteral: string): void {
    this.passwordHash = passwordLiteral;
  }
}
import Role from '../role/Role'

export default class Account {

  id: number

  createdAt: Date;

  updatedAt: Date;

  username: string

  email: string

  passwordHash: string

  roles: Role[];

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  setPasswordHash (passwordLiteral: string): void {
    this.passwordHash = passwordLiteral;
  }
}
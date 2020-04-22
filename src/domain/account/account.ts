import { sign, verify} from 'jsonwebtoken'
import { hash, compare } from 'bcrypt';
import { Role } from '../role/role'

export class Account {

  private static JWT_SECRET = 'vc2iX6e%K>47WVH@#8px9qoYRU@Kes}D8uB4pzzpkZp=L[3RX#$JMtMdVbzv'

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

  async setPasswordHash (passwordLiteral: string): Promise<void> {
    this.passwordHash = await hash(passwordLiteral, 10)
  }

  async checkPassword(passwordLiteral: string): Promise<boolean> {
    if(!this.passwordHash) return false;
    return await compare(passwordLiteral, this.passwordHash)
  }

  async generateJwt() {
    const payload = { id: this.id }
    return new Promise((resolve, reject) => {
      sign(payload, Account.JWT_SECRET, (error, token) => error ? reject(error) : resolve(token))
    })
  }

  async verifyJwt(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, Account.JWT_SECRET, (error, decodedToken) => error ? reject(error) : resolve(decodedToken))
    })
  }
}
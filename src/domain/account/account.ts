import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt';
import { Role, RolePartial } from '../role/role'

export interface AccountPartial {
  id?: number
  username?: string
  email?: string
  passwordHash?: string
  roles?: RolePartial[]
}

export class Account implements AccountPartial {

  private static JWT_SECRET = 'vc2iX6e%K>47WVH@#8px9qoYRU@Kes}D8uB4pzzpkZp=L[3RX#$JMtMdVbzv'

  id: number
  username: string
  email: string
  passwordHash: string
  roles: Role[]

  constructor(accountPartial: AccountPartial) {
    Object.assign(this, accountPartial)
  }

  async setPasswordHash (password: string): Promise<void> {
    this.passwordHash = await hash(password, 10)
  }

  async checkPassword(passwordLiteral: string): Promise<boolean> {
    if(!this.passwordHash) return false
    return await compare(passwordLiteral, this.passwordHash)
  }

  async generateJwt(): Promise<string> {
    const payload = { id: this.id }
    return new Promise((resolve, reject) => {
      signJwt(payload, Account.JWT_SECRET, (error, token) => {
        // TO DO - Understant what kind of errors this function could be returining to hadle it better
        if(error) throw Error('Invalid payload error')
        resolve(token)
      })
    })
  }

  async verifyJwt(token: string): Promise<AccountPartial> {
    return new Promise((resolve, reject) => {
      verifyJwt(token, Account.JWT_SECRET, (error, decodedToken) => {
        if (error) throw Error('Invalid access token')
        resolve(decodedToken)
      })
    })
  }
}
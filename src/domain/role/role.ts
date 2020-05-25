import { Account, AccountPartial } from '../account/account'
import { Authorization, AuthorizationPartial } from '../authorization/authorization'

export interface RolePartial {
  id?: number,
  name?: string
  authorizations?: AuthorizationPartial[],
  accounts?: AccountPartial[]
}

export class Role {
  id: number
  name: string
  authorizations: Authorization[]
  accounts: Account[]

  constructor(rolePartial: RolePartial) {
    Object.assign(this, rolePartial)
  }
}
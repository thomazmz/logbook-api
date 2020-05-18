import { Account, AccountPartial } from '../account/account'
import { Permission, PermissionPartial } from '../permission/permission'

export interface RolePartial {
  id?: number,
  name?: string
  permissions?: PermissionPartial[],
  accounts?: AccountPartial[]
}

export class Role {
  id: number
  name: string
  permissions: Permission[]
  accounts: Account[]

  constructor(rolePartial: RolePartial) {
    Object.assign(this, rolePartial)
  }
}
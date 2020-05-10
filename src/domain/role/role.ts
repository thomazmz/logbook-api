import { Account } from '../account/account'
import { Permission } from '../permission/permission'

export class Role {

  id: number

  name: string

  permissions: Permission[]

  accounts: Account[]

  constructor(attributes: Partial<Role>) {
    Object.assign(this, attributes)
  }
 }
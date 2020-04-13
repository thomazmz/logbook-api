import { Account } from '../account'
import { Permission } from '../permission'

export default class Role {

  id: number

  screatedAt: Date;

  updatedAt: Date;

  name: string

  permissions: Permission[]

  accounts: Account[]

  constructor(attributes: Partial<Role>) {
    Object.assign(this, attributes)
  }
}
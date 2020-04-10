import Account from '../account/Account';
import Permission from '../permission/Permission'

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
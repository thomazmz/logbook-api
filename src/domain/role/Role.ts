import Account from '../account/Account';
import Permission from '../permission/Permission'

export default class Role {

  id: number

  screatedAt: Date;

  updatedAt: Date;

  name: string

  permissions: Permission[]

  accounts: Account[]

  constructor(name: string) {
    this.name = name;
  }

  setPermissions(permissions: Permission[]) {
    this.permissions = permissions;
  }
}
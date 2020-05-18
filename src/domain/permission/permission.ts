import { Role, RolePartial } from '../role/role'

export interface PermissionPartial {
  id?: number,
  name?: string
  roles?: RolePartial[],
}

export class Permission {
  id: number
  name: string
  roles: Role[]

  constructor(permissionPartial: PermissionPartial) {
    Object.assign(this, permissionPartial)
  }
}
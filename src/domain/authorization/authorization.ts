import { Role, RolePartial } from '../role/role'

export interface AuthorizationPartial {
  id?: number,
  name?: string
  roles?: RolePartial[],
}

export class Authorization {
  id: number
  name: string
  roles: Role[]

  constructor(authorizationPartial: AuthorizationPartial) {
    Object.assign(this, authorizationPartial)
  }
}
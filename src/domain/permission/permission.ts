import { Role } from '../role/role'

export class Permission {

  id: number

  name: string
  
  roles: Role[]

  constructor(attributes: Partial<Permission>) {
    Object.assign(this, attributes)
  }
}
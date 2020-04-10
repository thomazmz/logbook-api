import Role from '../role/Role';

export default class Permission {

  id: number

  createdAt: Date;

  updatedAt: Date;

  name: string
  
  roles: Role[]

  constructor(attributes: Partial<Permission>) {
    Object.assign(this, attributes)
  }
}
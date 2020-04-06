import Role from '../role/Role';

export default class Permission {

  id: number

  createdAt: Date;

  updatedAt: Date;

  name: string
  
  roles: Role[]

  constructor(name: string) {
    this.name = name;
  }
}
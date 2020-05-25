import { Authorization } from '../authorization/authorization'
import { Role, RolePartial } from './role'

export type RoleService = {
  create(rolePartial: RolePartial): Promise<Role>
  findAll(): Promise<Role[]>
  findById(roleId:number): Promise<Role>
  getAuthorizations(roleId: number): Promise<Authorization[]>
  update(rolePartial: RolePartial): Promise<Role>
  updateAuthorizations(role: RolePartial): Promise<Role>
}
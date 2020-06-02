import { Role } from './role'
import { Authorization } from '../authorization/authorization';

export interface RoleRepository {
  deleteById(id: number): Promise<void>
  findAll(): Promise<Role[]>
  findById(id: number): Promise<Role>
  save(role: Role): Promise<Role>
  findByName: (name: string) => Promise<Role>
  loadAuthorizations: (role: Role)=> Promise<Authorization[]>
}
import { Role } from './role'

export interface RoleRepository {

  save(role: Role): Promise<Role>

}
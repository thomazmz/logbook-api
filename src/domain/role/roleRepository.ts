import { Role } from './role'
import { CrudRepository } from '../crudRepository';
import { Permission } from '../permission/permission';

export interface RoleRepository extends CrudRepository<Role, number> {
  findByName(name: string): Promise<Role>
  loadPermissions(role: Role): Promise<Permission[]>
}
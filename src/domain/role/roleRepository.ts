import { Role } from './role'
import { CrudRepository } from '../crudRepository';

export interface RoleRepository extends CrudRepository<Role, number> {
  findByName(name: string): Promise<Role>
}
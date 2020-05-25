import { Role } from './role'
import { CrudRepository } from '../crudRepository';
import { Authorization } from '../authorization/authorization';

export interface RoleRepository extends CrudRepository<Role, number> {
  findByName(name: string): Promise<Role>
  loadAuthorizations(role: Role): Promise<Authorization[]>
}
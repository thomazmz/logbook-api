import { Role } from ".";

export default interface RoleRepository {

  save(role: Role): Promise<Role>

}
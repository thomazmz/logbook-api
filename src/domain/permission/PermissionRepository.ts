import { Permission } from ".";

export default interface PermissionRepository {

  findAll(): Promise<Permission[]>

  findOrCreateByName(name: string): Promise<Permission>

  findOrCreateByNames(names: string[]): Promise<Permission[]>

  deleteByName(name: string)

  deleteByNames(names: string[])

}
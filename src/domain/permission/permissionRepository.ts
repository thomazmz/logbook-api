import { Permission } from ".";

export default interface PermissionRepository {

  findAll(): Promise<Permission[]>

  findOrCreate(attributes: Partial<Permission>): Promise<Permission>
  
  findOrCreateMany(attributes: Partial<Permission>[]): Promise<Permission[]>

  findByName(name: string): Promise<Permission>

  deleteByName(name: string)

}
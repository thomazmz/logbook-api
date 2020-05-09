import { Permission } from './permission'

export interface PermissionRepository {
 
  findOrCreate(attributes: Partial<Permission>): Promise<Permission>

  findOrCreateMany(attributes: Partial<Permission>[]): Promise<Permission[]>
}
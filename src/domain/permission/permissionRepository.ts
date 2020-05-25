import { Permission, PermissionPartial } from './permission'

export interface PermissionRepository {
 
  findOrCreate(attributes: PermissionPartial): Promise<Permission>

  findOrCreateMany(attributes: PermissionPartial[]): Promise<Permission[]>
}
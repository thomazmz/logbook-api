import { Permission } from './permission'

export interface PermissionRepository {

  save(permission: Permission): Promise<Permission>

  findByName(name: string): Promise<Permission>

  findAll(): Promise<Permission[]>

  findOrCreate(attributes: Partial<Permission>): Promise<Permission>

  findOrCreateMany(attributes: Partial<Permission>[]): Promise<Permission[]>

  deleteByName(name: string): Promise<void>
}
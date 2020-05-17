import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

export const permissionNames = () => [
  'readPermissions',
  'readRoles'
]

export interface PermissionService {
  findAll(): Promise<Permission[]>
  findByName(name:string): Promise<Permission>
  findByNames(names: string[]): Promise<Permission[]>
}

export const permissionServiceFactory = (
  permissionNames: string[],
  permissionRepository: PermissionRepository
): PermissionService => ({

  async findAll(): Promise<Permission[]> {
    return permissionRepository.findOrCreateMany(permissionNames.map(name => ({ name })))
  },

  async findByName(name: string): Promise<Permission> {
    if(!permissionNames.includes(name)) throw Error(`"${name}" is not a valid Permission name.`)
    return permissionRepository.findOrCreate({ name })
  },
  
  async findByNames(names: string[]): Promise<Permission[]> {
    return Promise.all(names.map(name => this.findByName(name)))
  }
})
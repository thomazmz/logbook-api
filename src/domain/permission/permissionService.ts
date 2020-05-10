import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

export const permissionNames = Object.freeze([
  'readPermissions',
  'readRoles'
])

export type PermissionService = {
  findAll(): Promise<Permission[]>
  // findByName(name:string): Promise<Permission>
  // findByNames(names: string[]): Promise<Permission[]>
}

export const permissionServiceFactory = (
  permissionRepository: PermissionRepository
): PermissionService => ({

  findAll(): Promise<Permission[]> {
    return permissionRepository.findOrCreateMany(permissionNames.map(name => ({ name })))
  },

  // findByName(name: string): Promise<Permission> {
  //   if(!permissionNames.includes(name)) return null
  //   return permissionRepository.findOrCreate({ name })
  // },
  
  // findByNames(names: string[]): Promise<Permission[]> {
  //   return Promise.all(names.map(name => this.findByName(name)))
  // }
})
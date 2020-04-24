import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

export type PermissionService = { 
  create(name:string): Promise<Permission>
}

export const permissionServiceFactory = (permissionRepository: PermissionRepository): PermissionService => ({
  async create(name:string): Promise<Permission> {

    const findedByName = await permissionRepository.findByName(name)
    if(findedByName) throw new Error('Name already in use.');

    const permission = new Permission({ name })
    
    return permissionRepository.save(permission)
  }
})
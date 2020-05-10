import { Role } from './role'
import { RoleRepository } from './roleRepository'
import { PermissionService } from '../permission/permissionService'
import { Permission } from '../permission/permission'

export type RoleService = {
  create(rolePartial: Partial<Role>): Promise<Role>
  findById(roleId:number): Promise<Role>
}

export const roleServiceFactory = (
  roleRepository: RoleRepository
): RoleService => ({

  async create(rolePartial: Partial<Role>): Promise<Role> {
    const findedRole = await roleRepository.findByName(rolePartial.name)
    if(findedRole) throw new Error('Role name already in use.')

    const role = new Role(rolePartial)
    return roleRepository.save(role)
  },

  async findById(roleId: number): Promise<Role> {
    const findedRole = await roleRepository.findById(roleId)
    if(!findedRole) throw new Error(`Could not find any Role entity with "id" property equal to ${roleId}.`)
    return findedRole
  }
})
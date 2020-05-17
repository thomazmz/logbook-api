import { Role, RolePartial } from './role'
import { RoleRepository } from './roleRepository'
import { PermissionService } from '../permission/permissionService'
import { Permission } from '../permission/permission'

export type RoleService = {
  create(rolePartial: Partial<Role>): Promise<Role>
  findById(roleId:number): Promise<Role>
  getPermissions(roleId: number): Promise<Permission[]>
  updatePermissions(role: RolePartial): Promise<Role>
}

export const roleServiceFactory = (
  roleRepository: RoleRepository,
  permissionService: PermissionService
): RoleService => ({

  async create(rolePartial: Partial<Role>): Promise<Role> {
    const findedRole = await roleRepository.findByName(rolePartial.name)
    
    if(findedRole) throw Error('Role name already in use.')

    const role = new Role(rolePartial)
    return roleRepository.save(role)
  },

  async findById(roleId: number): Promise<Role> {
    const findedRole = await roleRepository.findById(roleId)
    if(!findedRole) throw new Error(`Could not find any Role entity with "id" property equal to ${roleId}.`)

    return findedRole
  },

  async getPermissions(roleId: number): Promise<Permission[]> {
    const findedRole = await this.findById(roleId)
    return findedRole.permissions
  },

  async updatePermissions(rolePartial: RolePartial): Promise<Role> {
    const findedRole = await this.findById(rolePartial.id)

    const permissionNames = rolePartial.permissions.map(p => p.name)
    const findedPermissions = await permissionService.findByNames(permissionNames)

    findedRole.permissions = findedPermissions
    return roleRepository.save(findedRole)
  }
})
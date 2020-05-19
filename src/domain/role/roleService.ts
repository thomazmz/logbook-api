import { Role, RolePartial } from './role'
import { RoleRepository } from './roleRepository'
import { PermissionService } from '../permission/permissionService'
import { Permission } from '../permission/permission'

export type RoleService = {
  findAll(): Promise<Role[]>
  create(rolePartial: RolePartial): Promise<Role>
  findById(roleId:number): Promise<Role>
  update(rolePartial: RolePartial): Promise<Role>
  getPermissions(roleId: number): Promise<Permission[]>
  updatePermissions(role: RolePartial): Promise<Role>
}

export const roleServiceFactory = (
  roleRepository: RoleRepository,
  permissionService: PermissionService
): RoleService => ({

  async findAll(): Promise<Role[]> {
    const findedRoles = await roleRepository.findAll()
    return findedRoles
  },

  async create(rolePartial: RolePartial): Promise<Role> {
    const findedRole = await roleRepository.findByName(rolePartial.name)
    
    if(findedRole) throw Error('Role name already in use.')

    const role = new Role(rolePartial)
    return roleRepository.save(role)
  },

  async findById(roleId: number): Promise<Role> {
    const findedRole = await roleRepository.findById(roleId)
    if(!findedRole) throw Error(`Could not find any Role entity with "id" property equal to ${roleId}.`)
    return findedRole
  },

  async update(rolePartial: RolePartial): Promise<Role> {
    const { id, name } = rolePartial

    const findedRole = await roleRepository.findById(id)
    if(name) findedRole.name = name

    return roleRepository.save(findedRole)
  },

  async getPermissions(roleId: number): Promise<Permission[]> {
    const findedRole = await this.findById(roleId)
    return roleRepository.loadPermissions(findedRole)
  },

  async updatePermissions(rolePartial: RolePartial): Promise<Role> {
    const findedRole = await this.findById(rolePartial.id)

    const permissionNames = rolePartial.permissions.map(p => p.name)
    const findedPermissions = await permissionService.findByNames(permissionNames)

    findedRole.permissions = findedPermissions
    return roleRepository.save(findedRole)
  }
})
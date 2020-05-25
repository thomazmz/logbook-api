import { InvalidEntityIdentifierError } from '../error/invalidEntityIdentifierError'
import { UnavailableEntityIdentifierError } from '../error/unavailableEntityIdentifierError'
import { Role, RolePartial } from './role'
import { RoleRepository } from './roleRepository'
import { AuthorizationService } from '../authorization/authorizationService'
import { Authorization } from '../authorization/authorization'

export type RoleService = {
  findAll(): Promise<Role[]>
  create(rolePartial: RolePartial): Promise<Role>
  findById(roleId:number): Promise<Role>
  update(rolePartial: RolePartial): Promise<Role>
  getAuthorizations(roleId: number): Promise<Authorization[]>
  updateAuthorizations(role: RolePartial): Promise<Role>
}

export const roleServiceFactory = (
  roleRepository: RoleRepository,
  authorizationService: AuthorizationService
): RoleService => ({

  async findAll(): Promise<Role[]> {
    const findedRoles = await roleRepository.findAll()
    return findedRoles
  },

  async create(rolePartial: RolePartial): Promise<Role> {
    const findedRole = await roleRepository.findByName(rolePartial.name)
    
    if(findedRole) throw new UnavailableEntityIdentifierError(Role.name, 'id', rolePartial.name)

    const role = new Role(rolePartial)
    return roleRepository.save(role)
  },

  async findById(roleId: number): Promise<Role> {
    const findedRole = await roleRepository.findById(roleId)
    if(!findedRole) throw new InvalidEntityIdentifierError(Role.name, 'id', roleId)
    return findedRole
  },

  async update(rolePartial: RolePartial): Promise<Role> {
    const { id, name } = rolePartial

    const findedRole = await roleRepository.findById(id)
    if(name) findedRole.name = name

    return roleRepository.save(findedRole)
  },

  async getAuthorizations(roleId: number): Promise<Authorization[]> {
    const findedRole = await this.findById(roleId)
    return roleRepository.loadAuthorizations(findedRole)
  },

  async updateAuthorizations(rolePartial: RolePartial): Promise<Role> {
    const findedRole = await this.findById(rolePartial.id)

    const authorizationNames = rolePartial.authorizations.map(p => p.name)
    const findedAuthorizations = await authorizationService.findByNames(authorizationNames)

    findedRole.authorizations = findedAuthorizations
    return roleRepository.save(findedRole)
  }
})
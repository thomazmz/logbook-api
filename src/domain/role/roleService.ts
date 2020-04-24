import { RoleRepository } from './roleRepository'
import { Role } from './role'

export type RoleService = { 
  create(name:string): Promise<Role>
}

export const roleServiceFactory = (roleRepository: RoleRepository): RoleService => ({
  async create(name: string): Promise<Role> {

    const findedByName = await roleRepository.findByName(name)
    if(findedByName) throw new Error('Permission name already in use.');

    const role = new Role({ name })
    
    return roleRepository.save(role)
  }
})
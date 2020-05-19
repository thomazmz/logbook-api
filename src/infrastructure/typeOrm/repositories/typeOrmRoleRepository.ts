import { EntityRepository, getCustomRepository, getConnection } from 'typeorm'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'
import { Role } from '../../../domain/role/role'
import { RoleRepository } from '../../../domain/role/roleRepository'
import { RoleSchema } from '../schemas/roleSchema'
import { Permission } from '../../../domain'

@EntityRepository(RoleSchema)
export class TypeOrmRoleRepository extends TypeOrmCrudRepository<Role, number> implements RoleRepository {

  async findByName(name: string): Promise<Role> {
    return this.repository.findOne( {where: { name }})
  }

  async loadPermissions(role: Role): Promise<Permission[]> {
    role.permissions = await this.repository
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(role) 
      .loadMany()
    
    return role.permissions
  }
}

export const typeOrmRoleRepositoryFactory = (): RoleRepository => {
  return getCustomRepository(TypeOrmRoleRepository)
}
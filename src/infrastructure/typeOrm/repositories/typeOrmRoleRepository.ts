import { EntityRepository, getCustomRepository } from 'typeorm'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'
import { Role } from '../../../domain/role/role'
import { RoleRepository } from '../../../domain/role/roleRepository'
import { RoleSchema } from '../schemas/roleSchema'
import { Authorization } from '../../../domain'

@EntityRepository(RoleSchema)
export class TypeOrmRoleRepository extends TypeOrmCrudRepository<Role, number> implements RoleRepository {

  async findByName(name: string): Promise<Role> {
    return this.repository.findOne( {where: { name }})
  }

  async loadAuthorizations(role: Role): Promise<Authorization[]> {
    role.authorizations = await this.repository
      .createQueryBuilder()
      .relation(Role, 'authorizations')
      .of(role) 
      .loadMany()
    
    return role.authorizations
  }
}

export const typeOrmRoleRepositoryFactory = (): RoleRepository => {
  return getCustomRepository(TypeOrmRoleRepository)
}
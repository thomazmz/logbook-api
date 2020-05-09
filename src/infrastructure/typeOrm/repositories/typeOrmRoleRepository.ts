import { EntityRepository, getCustomRepository } from 'typeorm'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'
import { Role } from '../../../domain/role/role'
import { RoleRepository } from '../../../domain/role/roleRepository'
import { RoleSchema } from '../schemas/roleSchema'

@EntityRepository(RoleSchema)
export class TypeOrmRoleRepository extends TypeOrmCrudRepository<Role, number> implements RoleRepository {

  findByName(name: string): Promise<Role> {
    return this.repository.findOne( {where: { name }})
  }
}

export const typeOrmRoleRepositoryFactory = (): RoleRepository => {
  return getCustomRepository(TypeOrmRoleRepository)
}
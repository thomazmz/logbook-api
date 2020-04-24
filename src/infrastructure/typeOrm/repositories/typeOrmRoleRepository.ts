import { EntityRepository, AbstractRepository } from 'typeorm'
import { Role } from '../../../domain/role/role'
import { RoleRepository } from '../../../domain/role/roleRepository'
import { RoleSchema } from '../schemas/roleSchema'

@EntityRepository(RoleSchema)
export class TypeOrmRoleRepository extends AbstractRepository<Role> implements RoleRepository {

  findByName(name: string): Promise<Role> {
    return this.repository.findOne({where: { name }})
  }

  save(role: Role): Promise<Role> {
    return this.repository.save(role)
  }
}
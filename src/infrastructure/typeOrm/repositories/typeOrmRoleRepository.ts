import { EntityRepository, AbstractRepository } from 'typeorm'
import { Role, RoleRepository } from '../../../domain/role'
import { RoleSchema } from '../schemas/roleSchema'

@EntityRepository(RoleSchema)
export class TypeOrmRoleRepository extends AbstractRepository<Role> implements RoleRepository {

  save(role: Role): Promise<Role> {
    return this.repository.save(role)
  }
}
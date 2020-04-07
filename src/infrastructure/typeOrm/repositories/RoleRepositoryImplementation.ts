import { EntityRepository, AbstractRepository } from 'typeorm'
import { Role, RoleRepository } from '../../../domain/role'
import { RoleSchema } from '../schemas/RoleSchema'

@EntityRepository(RoleSchema)
export class RoleRepositoryImplementation extends AbstractRepository<Role> implements RoleRepository {

  save(role: Role): Promise<Role> {
    return this.repository.save(role)
  }
}
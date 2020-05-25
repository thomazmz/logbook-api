import { EntityRepository, getCustomRepository } from 'typeorm'
import { Authorization, AuthorizationPartial, AuthorizationRepository } from '../../../domain'
import { AuthorizationSchema } from '../schemas/authorizationSchema'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'

@EntityRepository(AuthorizationSchema)
export class TypeOrmAuthorizationRepository extends TypeOrmCrudRepository<Authorization, number> implements AuthorizationRepository {

  findOrCreate(attributes: AuthorizationPartial): Promise<Authorization> {
    return this.repository.findOne({ where: attributes})
      .then(authorization => authorization ? authorization : this.repository.save(new Authorization(attributes)))
  }

  findOrCreateMany(attributes: AuthorizationPartial[]): Promise<Authorization[]> {
    return Promise.all(attributes.map(authorizationAttributes => this.findOrCreate(authorizationAttributes)))
  }
}

export const typeOrmAuthorizationRepositoryFactory = (): AuthorizationRepository => {
  return getCustomRepository(TypeOrmAuthorizationRepository)
}
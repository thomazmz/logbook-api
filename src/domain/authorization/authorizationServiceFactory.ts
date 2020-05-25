import { InvalidEntityIdentifierError } from '../errors/invalidEntityIdentifierError'
import { AuthorizationService } from './authorizationService'
import { AuthorizationRepository } from './authorizationRepository'
import { Authorization } from './authorization'

export const authorizationServiceFactory = (
  authorizationNames: string[],
  authorizationRepository: AuthorizationRepository
): AuthorizationService => ({

  async findAll(): Promise<Authorization[]> {
    return authorizationRepository.findOrCreateMany(authorizationNames.map(name => ({ name })))
  },

  async findByName(name: string): Promise<Authorization> {
    if(!authorizationNames.includes(name)) throw new InvalidEntityIdentifierError(Authorization.name, "name", name)
    return authorizationRepository.findOrCreate({ name })
  },
  
  async findByNames(names: string[]): Promise<Authorization[]> {
    return Promise.all(names.map(name => this.findByName(name)))
  }
})
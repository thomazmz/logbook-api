import { InvalidEntityIdentifierError } from '../error/invalidEntityIdentifierError'
import { AuthorizationRepository } from './authorizationRepository'
import { Authorization } from './authorization'

export const authorizationNames = () => [
  'readAuthorizations',
  'readRoles'
]

export interface AuthorizationService {
  findAll(): Promise<Authorization[]>
  findByName(name:string): Promise<Authorization>
  findByNames(names: string[]): Promise<Authorization[]>
}

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
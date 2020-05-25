import { Authorization, AuthorizationPartial } from './authorization'

export interface AuthorizationRepository {
 
  findOrCreate(attributes: AuthorizationPartial): Promise<Authorization>

  findOrCreateMany(attributes: AuthorizationPartial[]): Promise<Authorization[]>
}
import { Authorization } from './authorization'

export interface AuthorizationService {
  findAll(): Promise<Authorization[]>
  findByName(name:string): Promise<Authorization>
  findByNames(names: string[]): Promise<Authorization[]>
}
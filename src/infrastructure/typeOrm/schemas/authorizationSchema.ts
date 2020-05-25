import { EntitySchema } from 'typeorm';
import { Authorization, Role } from '../../../domain'

export const AuthorizationSchema = new EntitySchema<Authorization>({
  target: Authorization,
  name: Authorization.name,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment'
    },
    name: {
      type: String,
      unique: true
    }
  },
  relations: {
    roles: {
      type: 'many-to-many',
      target: Role.name
    }
  }
})
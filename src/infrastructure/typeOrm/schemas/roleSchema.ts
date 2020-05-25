import { EntitySchema } from 'typeorm';
import { Role, Account, Authorization } from '../../../domain'

export const RoleSchema = new EntitySchema<Role>({
  target: Role,
  name: Role.name,
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
    accounts: {
      type: 'many-to-many',
      target: Account.name
    },
    authorizations: {
      type: 'many-to-many',
      target: Authorization.name,
      joinTable: {
        name: 'authorizations_by_roles',
      }
    }
  }
})
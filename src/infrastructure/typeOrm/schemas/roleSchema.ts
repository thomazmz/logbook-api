import { EntitySchema } from "typeorm";
import { Role, Account, Permission } from '../../../domain'

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
    permissions: {
      type: 'many-to-many',
      target: Permission.name,
      eager: true,
      joinTable: {
        name: 'permissions_by_roles',
      }
    }
  }
})
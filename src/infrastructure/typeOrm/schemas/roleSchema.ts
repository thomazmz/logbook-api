import { EntitySchema } from "typeorm";
import { Role } from '../../../domain/role'

export const RoleSchema = new EntitySchema<Role>({
  name: 'role',
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
      target: 'account'
    },
    permissions: {
      eager: true,
      type: 'many-to-many',
      target: 'permission',
      joinTable: {
        name: 'permissions_by_roles',
      }
    }
  }
})
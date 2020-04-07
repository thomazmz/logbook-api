import { EntitySchema } from "typeorm";
import { Permission } from '../../../domain/permission'

export const PermissionSchema = new EntitySchema<Permission>({
  name: 'permission',
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
      target: 'role'
    }
  }
})
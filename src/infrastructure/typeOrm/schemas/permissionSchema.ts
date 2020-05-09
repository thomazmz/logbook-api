import { EntitySchema } from 'typeorm';
import { Permission, Role } from '../../../domain'

export const PermissionSchema = new EntitySchema<Permission>({
  target: Permission,
  name: Permission.name,
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
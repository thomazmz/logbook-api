import { EntitySchema } from "typeorm";
import { Account } from '../../../domain'

export const AccountSchema = new EntitySchema<Account>({
  name: 'account',
  columns: {
    id: {
      name: 'id',
      type: Number,
      primary: true,
      generated: 'increment'
    },
    email: {
      name: 'email',
      type: String,
      unique: true
    },
    username: {
      name: 'username',
      type: String,
      unique: true
    },
    passwordHash: {
      name: 'password_hash',
      type: String
    }
  },
  relations: {
    roles: {
        type: 'many-to-many',
        target: 'role',
        joinTable: {
          name: 'roles_by_accounts',
        }
    }
  }
})
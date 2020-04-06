import { EntitySchema } from "typeorm";
import { Account } from '../../../domain/account'

export const AccountSchema = new EntitySchema<Account>({
  name: 'account',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment'
    },
    email: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    passwordHash: {
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
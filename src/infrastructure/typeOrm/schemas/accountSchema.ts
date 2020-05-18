import { EntitySchema } from 'typeorm';
import { Account, Role } from '../../../domain'

export const AccountSchema = new EntitySchema<Account>({
  target: Account,
  name: Account.name,
  columns: {
    id: {
      name: 'id',
      type: Number,
      primary: true,
      generated: 'increment'
    },
    emailAddress: {
      name: 'email_address',
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
        target: Role.name,
        joinTable: {
          name: 'roles_by_accounts',
        }
    }
  }
})
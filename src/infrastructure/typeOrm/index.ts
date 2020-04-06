import "reflect-metadata";
import {createConnection, getRepository, Repository} from "typeorm"
import Account from '../../domain/account/Account.entity'
import Role from '../../domain/role/Role.entity'
import Permission from '../../domain/permissions/Permission.entity'

export let accountRepository: Repository<Account>
export let roleRepository: Repository<Role>
export let permissionRepository: Repository<Permission>

export async function init() {
  await createConnection()
  accountRepository = getRepository(Account)
  roleRepository = getRepository(Role)
  permissionRepository = getRepository(Permission)
}
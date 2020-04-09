import { init as setUpDatabase } from './typeOrm'
import { init as setUpEmailService } from './sendGrid'
import { init as setUpCacheService } from './redis'

import { AccountRepository } from "../domain/account"
import { PermissionRepository } from '../domain/permission'
import { RoleRepository } from '../domain/role'

export let accountRepository: AccountRepository
export let permissionRepository: PermissionRepository
export let roleRepository: RoleRepository

export async function init() {

  const [database, emailService, cacheService] = await Promise.all([
    setUpDatabase(),
    setUpEmailService(),
    setUpCacheService()
  ])

  accountRepository = database.accountRepository,
  permissionRepository = database.permissionRepository,
  roleRepository = database.roleRepository

  return [database, emailService, cacheService]
}
import { init as setUpDatabaseProvider } from './typeOrm'
import { init as setUpEmailService } from './sendGrid'
import { init as setUpCacheService } from './redis'

import { AccountRepository } from "../domain/account"
import { PermissionRepository } from '../domain/permission'
import { RoleRepository } from '../domain/role'

export let accountRepository: AccountRepository
export let permissionRepository: PermissionRepository
export let roleRepository: RoleRepository

export function init() {
  return Promise.all([ 
    setUpDatabaseProvider(),
    setUpEmailService(),
    setUpCacheService()

  ]).then(([ repositories, emailServiceImplementation, cacheServiceImplementation ]) => {
    // Repositories
    accountRepository = repositories.accountRepositoryImplementation,
    permissionRepository = repositories.permissionRepositoryImplementation,
    roleRepository = repositories.roleRepositoryImplementation

    // Return infrastructure instances
    return [ repositories, emailServiceImplementation, cacheServiceImplementation ] 
  })
}
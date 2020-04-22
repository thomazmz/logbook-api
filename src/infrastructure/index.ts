import { init as setUpDatabase } from './typeOrm'
import { init as setUpEmailService } from './sendGrid'
import { init as setUpCacheService } from './redis'

export async function init() {
  return await Promise.all([
    setUpDatabase()
  ])
}

export { typeOrmAccountRepositoryFactory as accountRepositoryFactory } from './typeOrm'
export { typeOrmRoleRepositoryFactory as roleRepositoryFactory } from './typeOrm'
export { typeOrmPermissionRepositoryFactory as permissionRepositoryFactory } from './typeOrm'
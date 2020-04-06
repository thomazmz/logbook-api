import { init as setUpDatabaseProvider } from './typeOrm'
import { init as setUpEmailService } from './sendGrid'
import { init as setUpCacheService } from './redis'
import { AccountRepository } from "../domain/account"

export let accountRepository: AccountRepository

export function init() {
  return Promise.all([ 
    setUpDatabaseProvider(),
    setUpEmailService(),
    setUpCacheService()

  ]).then(([ repositories, emailServiceImplementation, cacheServiceImplementation ]) => {
    // Repositories
    accountRepository = repositories.accountRepositoryImplementation
    // Return infrastructure instances 
    return [ repositories, emailServiceImplementation, cacheServiceImplementation ] 
  })
}
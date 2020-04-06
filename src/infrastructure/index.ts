import { init as setUpDatabaseProvider } from './typeOrm'
import { init as setUpEmailProvider } from './sendGrid'
import { init as setUpCacheProvider } from './redis'

export function init() {
  return Promise.all([ 
    setUpDatabaseProvider(),
    setUpEmailProvider(),
    setUpCacheProvider()
  ])
}
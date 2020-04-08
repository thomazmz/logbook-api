import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm"
import { PermissionRepositoryImplementation } from './repositories/permissionRepositoryImplementation'
import { AccountRepositoryImplementation } from './repositories/accountRepositoryImplementation'
import { RoleRepositoryImplementation } from './repositories/roleRepositoryImplementation'
import { SnakeCaseNamingStrategy } from './strategies/snakeCaseNamingStrategy'
import { config } from './config'

const env = process.env.NODE_ENV

export async function init() {

  const connectionOptions = await getConnectionOptions()

  Object.assign(connectionOptions, config[env], { namingStrategy: new SnakeCaseNamingStrategy() })

  return createConnection(connectionOptions).then(connection => {
    return {
      accountRepositoryImplementation: connection.manager.getCustomRepository(AccountRepositoryImplementation),
      permissionRepositoryImplementation: connection.manager.getCustomRepository(PermissionRepositoryImplementation),
      roleRepositoryImplementation: connection.manager.getCustomRepository(RoleRepositoryImplementation)
    }
  })
}
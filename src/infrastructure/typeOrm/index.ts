import "reflect-metadata";
import {createConnection, getConnectionOptions } from "typeorm"
import { AccountRepositoryImplementation } from './repositories/AccountRepositoryImplementation'
import { PermissionRepositoryImplementation } from './repositories/PermissionRepositoryImplementation'
import { RoleRepositoryImplementation } from './repositories/RoleRepositoryImplementation'
import { SnakeCaseNamingStrategy} from './strategies/SnakeCaseNamingStrategy'

export async function init() {
  const connectionOptions = await getConnectionOptions()

  Object.assign(connectionOptions, { namingStrategy: new SnakeCaseNamingStrategy() })

  return createConnection(connectionOptions).then(connection => {
    return {
      accountRepositoryImplementation:  connection.manager.getCustomRepository(AccountRepositoryImplementation),
      permissionRepositoryImplementation:  connection.manager.getCustomRepository(PermissionRepositoryImplementation),
      roleRepositoryImplementation:  connection.manager.getCustomRepository(RoleRepositoryImplementation)
    }
  })
}
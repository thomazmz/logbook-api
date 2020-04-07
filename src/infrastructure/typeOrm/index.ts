import "reflect-metadata";
import {createConnection, getConnectionOptions } from "typeorm"
import { AccountRepositoryImplementation } from './repositories/accountRepositoryImplementation'
import { PermissionRepositoryImplementation } from './repositories/permissionRepositoryImplementation'
import { RoleRepositoryImplementation } from './repositories/roleRepositoryImplementation'
import { SnakeCaseNamingStrategy} from './strategies/snakeCaseNamingStrategy'

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
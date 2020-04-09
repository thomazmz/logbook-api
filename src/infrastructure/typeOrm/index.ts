import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm"
import { PermissionRepositoryImplementation } from './repositories/permissionRepositoryImplementation'
import { AccountRepositoryImplementation } from './repositories/accountRepositoryImplementation'
import { RoleRepositoryImplementation } from './repositories/roleRepositoryImplementation'
import { SnakeCaseNamingStrategy } from "./strategies/snakeCaseNamingStrategy";
import { config } from './config'

export async function init() {

  const namingStrategy = new SnakeCaseNamingStrategy()
  const connectionOptions = await getConnectionOptions()

  Object.assign(connectionOptions, config[process.env.NODE_ENV], { namingStrategy })

  const connection = await createConnection(connectionOptions)

  return {
    connection,
    accountRepository: connection.manager.getCustomRepository(AccountRepositoryImplementation),
    permissionRepository: connection.manager.getCustomRepository(PermissionRepositoryImplementation),
    roleRepository: connection.manager.getCustomRepository(RoleRepositoryImplementation)
  }
}
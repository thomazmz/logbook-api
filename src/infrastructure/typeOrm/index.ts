import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm"
import { TypeOrmPermissionRepository } from './repositories/typeOrmPermissionRepository'
import { TypeOrmAccountRepository } from './repositories/typeOrmAccountRepository'
import { TypeOrmRoleRepository } from './repositories/typeOrmRoleRepository'
import { SnakeCaseNamingStrategy } from "./strategies/snakeCaseNamingStrategy";
import { config } from './config'

export async function init() {

  const namingStrategy = new SnakeCaseNamingStrategy()
  const connectionOptions = await getConnectionOptions()

  Object.assign(connectionOptions, config[process.env.NODE_ENV], { namingStrategy })

  const connection = await createConnection(connectionOptions)

  return {
    connection,
    accountRepository: connection.manager.getCustomRepository(TypeOrmAccountRepository),
    permissionRepository: connection.manager.getCustomRepository(TypeOrmPermissionRepository),
    roleRepository: connection.manager.getCustomRepository(TypeOrmRoleRepository)
  }
}
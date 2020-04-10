import "reflect-metadata";
import { createConnection } from "typeorm"
import { TypeOrmPermissionRepository } from './repositories/typeOrmPermissionRepository'
import { TypeOrmAccountRepository } from './repositories/typeOrmAccountRepository'
import { TypeOrmRoleRepository } from './repositories/typeOrmRoleRepository'
import { SnakeCaseNamingStrategy } from "./strategies/snakeCaseNamingStrategy";
import connectionOptions from './config'

export async function init() {

  connectionOptions.namingStrategy = new SnakeCaseNamingStrategy()

  const connection = await createConnection(connectionOptions)

  return {
    connection,
    accountRepository: connection.manager.getCustomRepository(TypeOrmAccountRepository),
    permissionRepository: connection.manager.getCustomRepository(TypeOrmPermissionRepository),
    roleRepository: connection.manager.getCustomRepository(TypeOrmRoleRepository)
  }
}
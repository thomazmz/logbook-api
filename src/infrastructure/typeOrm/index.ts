import "reflect-metadata";
import { createConnection, getCustomRepository } from "typeorm"
import { SnakeCaseNamingStrategy } from "./strategies/snakeCaseNamingStrategy";

import { TypeOrmAccountRepository } from './repositories/typeOrmAccountRepository'
import { TypeOrmPermissionRepository } from './repositories/typeOrmPermissionRepository'
import { TypeOrmRoleRepository } from './repositories/typeOrmRoleRepository'

import { AccountRepository } from "../../domain/account/accountRepository";
import { PermissionRepository } from "../../domain/permission/permissionRepository";
import { RoleRepository } from "../../domain/role/roleRepository";

import connectionOptions from './config'

export async function init() {
  connectionOptions.namingStrategy = new SnakeCaseNamingStrategy()
  const connection = await createConnection(connectionOptions)
  return () => connection.close()
}

export const typeOrmAccountRepositoryFactory = (): AccountRepository => getCustomRepository(TypeOrmAccountRepository)
export const typeOrmPermissionRepositoryFactory = (): PermissionRepository => getCustomRepository(TypeOrmPermissionRepository)
export const typeOrmRoleRepositoryFactory = (): RoleRepository => getCustomRepository(TypeOrmRoleRepository)
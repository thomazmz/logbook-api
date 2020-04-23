import "reflect-metadata";
import { getCustomRepository } from "typeorm"

import { TypeOrmAccountRepository } from './repositories/typeOrmAccountRepository'
import { TypeOrmPermissionRepository } from './repositories/typeOrmPermissionRepository'
import { TypeOrmRoleRepository } from './repositories/typeOrmRoleRepository'

import { AccountRepository } from "../../domain/account/accountRepository";
import { PermissionRepository } from "../../domain/permission/permissionRepository";
import { RoleRepository } from "../../domain/role/roleRepository";

export { init as setUpDatabase } from './initializer'
export const typeOrmAccountRepositoryFactory = (): AccountRepository => getCustomRepository(TypeOrmAccountRepository)
export const typeOrmPermissionRepositoryFactory = (): PermissionRepository => getCustomRepository(TypeOrmPermissionRepository)
export const typeOrmRoleRepositoryFactory = (): RoleRepository => getCustomRepository(TypeOrmRoleRepository)
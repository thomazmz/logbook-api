import "reflect-metadata";
import {createConnection, getConnectionOptions } from "typeorm"
import { AccountRepositoryImplementation } from './repositories/AccountRepositoryImplementation'
import { PermissionRepositoryImplementation } from './repositories/PermissionRepositoryImplementation'
import { RoleRepositoryImplementation } from './repositories/RoleRepositoryImplementation'

export async function init() {
  return createConnection().then(connection => {
    return {
      accountRepositoryImplementation:  connection.manager.getCustomRepository(AccountRepositoryImplementation),
      permissionRepositoryImplementation:  connection.manager.getCustomRepository(PermissionRepositoryImplementation),
      roleRepositoryImplementation:  connection.manager.getCustomRepository(RoleRepositoryImplementation)
    }
  })
}
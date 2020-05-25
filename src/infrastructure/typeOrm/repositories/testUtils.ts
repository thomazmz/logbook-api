import { v4 as uuid } from 'uuid'
import { PermissionPartial } from '../../../domain/permission/permission'
import { AccountPartial } from '../../../domain/account/account'
import { RolePartial } from '../../../domain/role/role'

export function generateAccountPartial(): AccountPartial {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    emailAddress: `some@email.com_${identifier}` 
  }
}

export function generatePermissionPartial(): PermissionPartial {
  const identifier = uuid()
  return {
    name: `validPermission_${identifier}`
  }
}

export function generateRolePartial(): RolePartial {
  const identifier = uuid()
  return {
    name: `validPermission_${identifier}`
  }
}
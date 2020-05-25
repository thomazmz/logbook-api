import { v4 as uuid } from 'uuid'
import { AuthorizationPartial } from '../../domain/authorization/authorization'
import { AccountPartial } from '../../domain/account/account'
import { RolePartial } from '../../domain/role/role'

export function generateAccountPartial(): AccountPartial {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    emailAddress: `some@email.com_${identifier}` 
  }
}

export function generateAuthorizationPartial(): AuthorizationPartial {
  const identifier = uuid()
  return {
    name: `validAuthorization_${identifier}`
  }
}

export function generateRolePartial(): RolePartial {
  const identifier = uuid()
  return {
    name: `validAuthorization_${identifier}`
  }
}
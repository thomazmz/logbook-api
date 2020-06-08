export const authorizations = Object.freeze({
  READ_ROLES: { name: 'readRoles' },
  CREATE_ROLES: { name: 'createRoles' },
  UPDATE_ROLES: { name: 'updateRoles' },
  READ_ROLES_AUTHORIZATIONS: { name: 'readRolesAuthorizations' },
  UPDATE_ROLES_AUTHORIZATIONS: { name: 'updateRolesAuthorizations' }
})

export const authorizationNames = Object.keys(authorizations).map(authorizationString => {
  return authorizations[authorizationString].name
})
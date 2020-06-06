import { createContainer, asFunction, InjectionMode } from 'awilix'
import { Router } from 'express'
import * as infrastructure from '../infrastructure'
import * as domain from '../domain'
import * as account from './account'
import * as authorization from './authorization'
import * as role from './role'

// Create reource container
const resourceContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

// Register dependencies
resourceContainer.register({
  // Account
  accountController: asFunction(account.accountControllerFactory),
  accountRepository: asFunction(infrastructure.accountRepositoryFactory),
  accountService: asFunction(domain.accountServiceFactory),
  // Authorization
  authorizationNames: asFunction(authorization.resolveAuthorizationNames),
  authorizationController: asFunction(authorization.authorizationControllerFactory),
  authorizationRepository: asFunction(infrastructure.authorizationRepositoryFactory),
  authorizationService: asFunction(domain.authorizationServiceFactory),
  // Role
  roleController: asFunction(role.roleControllerFactory),
  roleRepository: asFunction(infrastructure.roleRepositoryFactory),
  roleService: asFunction(domain.roleServiceFactory),
})

// Define resources (routers might be added here)
export const resources = Object.freeze([
  { path: '/roles', factory: role.roleRouterFactory },
  { path: '/authorizations', factory: authorization.authorizationRouterFactory },
  { path: '/accounts', factory: account.accountRouterFactory }
])

// Export resolver function
export function resolveResourceRoutes(resolver: (path: string, router: Router) => void) {
  resources.forEach(({ path, factory }) => {
    return resolver(path, resourceContainer.build(factory))
  })
}
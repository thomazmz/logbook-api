import { createContainer, asFunction, InjectionMode, asValue } from 'awilix'
import * as infrastructure from '../infrastructure'
import * as domain from '../domain'

const resourceContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

resourceContainer.register({
  accountRepository: asFunction(infrastructure.accountRepositoryFactory),
  accountService: asFunction(domain.accountServiceFactory),
  authorizationRepository: asFunction(infrastructure.authorizationRepositoryFactory),
  authorizationService: asFunction(domain.authorizationServiceFactory),
  roleRepository: asFunction(infrastructure.roleRepositoryFactory),
  roleService: asFunction(domain.roleServiceFactory)
})

export function registerContextFunction<T> (stringIdentifier: string, factory: (...args: any[]) => T): void {
  resourceContainer.register(stringIdentifier, asFunction(factory));
}

export function registerContextValue<T> (stringIdentifier: string, value: any): void {
  resourceContainer.register(stringIdentifier, asValue(value));
}

export function contextResolver<T> (factory: (...args: any[]) => T): T {
  return resourceContainer.build(factory)
}
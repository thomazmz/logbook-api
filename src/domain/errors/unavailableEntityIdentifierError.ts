import { DomainError} from './domainError'

export class UnavailableEntityIdentifierError extends DomainError {
  constructor(domain: string, key: string, value: string | number, title: string = 'Unavailable Entity Identifier') {
    super(`${domain} ${key} "${value}" is already in use.`, `The property ${key} is an unique ${domain} identifier and should be unique.`)
    Object.setPrototypeOf(this, UnavailableEntityIdentifierError.prototype);
  }
}
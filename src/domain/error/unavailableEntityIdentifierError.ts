import { DomainError} from './domainError'

export class UnavailableEntityIdentifierError extends DomainError {
  constructor(domain: string, key: string, value: string, title: string = 'Unavailable Entity Identifier') {
    super(`${domain} ${key} "${value}" is not available.`, title)
    Object.setPrototypeOf(this, UnavailableEntityIdentifierError.prototype);
  }
}
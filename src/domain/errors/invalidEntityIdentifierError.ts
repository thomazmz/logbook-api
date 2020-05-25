import { DomainError } from './domainError'

export class InvalidEntityIdentifierError extends DomainError {
  constructor(domain: string, key: string, value: string | number, title: string = 'Invalid Entity Identifier') {
    super(`${domain} ${key} "${value}" is not valid.`, title)
    Object.setPrototypeOf(this, InvalidEntityIdentifierError.prototype);
  }
}
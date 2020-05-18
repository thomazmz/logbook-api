import { DomainError } from './domainError'
import { InvalidEntityIdentifierError } from './invalidEntityIdentifierError'

describe('invalidEntityIdentifierError', () => {

  test('invalidEntityIdentifierError should be instance of InvalidEntityIdentifier', () => {
    // Given
    const invalidEntityIdentifierError = new InvalidEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(invalidEntityIdentifierError).toBeInstanceOf(InvalidEntityIdentifierError)
  })

  test('invalidEntityIdentifierError should be instance of DomainError', () => {
    // Given
    const invalidEntityIdentifierError = new InvalidEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(invalidEntityIdentifierError).toBeInstanceOf(DomainError)
  })

  test('invalidEntityIdentifierError should have a default title', () => {
    // Given
    const invalidEntityIdentifierError = new InvalidEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(invalidEntityIdentifierError.title).toBeTruthy()
  })

  test('invalidEntityIdentifierError should have a timestamp', () => {
    // Given
    const invalidEntityIdentifierError = new InvalidEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(new Date(invalidEntityIdentifierError.timestamp)).toBeInstanceOf(Date)
  })
})
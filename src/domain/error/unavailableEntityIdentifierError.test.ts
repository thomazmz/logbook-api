import { DomainError } from './domainError'
import { UnavailableEntityIdentifierError } from './unavailableEntityIdentifierError'

describe('unavailableEntityIdentifierError', () => {

  test('unavailableEntityIdentifierError should be instance of InvalidEntityIdentifier', () => {
    // Given
    const unavailableEntityIdentifierError = new UnavailableEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(unavailableEntityIdentifierError).toBeInstanceOf(UnavailableEntityIdentifierError)
  })

  test('unavailableEntityIdentifierError should be instance of DomainError', () => {
    // Given
    const unavailableEntityIdentifierError = new UnavailableEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(unavailableEntityIdentifierError).toBeInstanceOf(DomainError)
  })

  test('unavailableEntityIdentifierError should have a default title', () => {
    // Given
    const unavailableEntityIdentifierError = new UnavailableEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(unavailableEntityIdentifierError.title).toBeTruthy()
  })

  test('unavailableEntityIdentifierError should have a timestamp', () => {
    // Given
    const unavailableEntityIdentifierError = new UnavailableEntityIdentifierError('Account', 'emailAddress', 'some@email.com')
    // Then
    expect(new Date(unavailableEntityIdentifierError.timestamp)).toBeInstanceOf(Date)
  })
})
export abstract class DomainError extends Error {

  title: string
  message: string
  timestamp: string

  constructor(message: string, title: string = 'Domain error') {
    super(message)
    this.title = title;
    this.message = message;
    this.timestamp = new Date().toString()
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
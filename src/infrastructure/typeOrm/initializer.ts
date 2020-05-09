import { SnakeCaseNamingStrategy } from './strategies/snakeCaseNamingStrategy';
import { createConnection, ConnectionOptions } from 'typeorm'
import config from './config'

export async function init(optionalConfig: Partial<ConnectionOptions> = {}) {
  config.namingStrategy = new SnakeCaseNamingStrategy()
  const connectionOptions = Object.assign( config, optionalConfig)
  const connection = await createConnection(connectionOptions)
  return connection;
}
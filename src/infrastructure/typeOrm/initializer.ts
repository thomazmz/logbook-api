import { SnakeCaseNamingStrategy } from "./strategies/snakeCaseNamingStrategy";
import { createConnection } from 'typeorm'
import connectionOptions from './config'

export async function init() {
  connectionOptions.namingStrategy = new SnakeCaseNamingStrategy()
  const connection = await createConnection(connectionOptions)
  return () => connection.close()
}
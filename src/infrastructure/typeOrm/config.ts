const environment = process.env.NODE_ENV

const entitiesDir = 'src/infrastructure/typeorm/schemas'
const migrationsDir = 'src/infrastructure/typeorm/migrations'
const subscribersDir = 'src/infrastructure/typeorm/subscribers'

const connectionOptions = {
  development : {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'logbook',
    password: 'logbook',
    database: 'logbook',
    migrationsRun: false,
    logging: false,
    entities: [`${entitiesDir}/**/*.ts`],
    migrations: [`${migrationsDir}/**/*.ts`],
    subscribers: [`${subscribersDir}/**/*.ts`],
    cli: {
      entitiesDir,
      migrationsDir,
      subscribersDir,
    }
  },
  test : {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'logbook',
    password: 'logbook',
    database: 'logbook-test',
    migrationsRun: false,
    logging: false,
    entities: [`${entitiesDir}/**/*.ts`],
    migrations: [`${migrationsDir}/**/*.ts`],
    subscribers: [`${subscribersDir}/**/*.ts`],
    cli: {
      entitiesDir,
      migrationsDir,
      subscribersDir,
    }
  },
  production : {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrationsRun: true,
    logging: false,
    entities: [`${entitiesDir}/**/*.ts`],
    migrations: [`${migrationsDir}/**/*.ts`],
    subscribers: [`${subscribersDir}/**/*.ts`],
    cli: {
      entitiesDir,
      migrationsDir,
      subscribersDir,
    }
  }
}

export = connectionOptions[environment]
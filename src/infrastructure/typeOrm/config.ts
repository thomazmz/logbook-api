const environment = process.env.NODE_ENV

const connectionOptions = {
  development : {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "logbook",
    password: "logbook",
    database: "logbook",
    migrationsRun: false,
    logging: true,
    entities: ["src/infrastructure/typeorm/schemas/**/*.ts"],
    migrations: ["src/infrastructure/typeorm/migrations/**/*.ts"],
    subscribers: ["src/infrastructure/typeorm/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/infrastructure/typeorm/schemas",
      migrationsDir: "src/infrastructure/typeorm/migrations",
      subscribersDir: "src/infrastructure/typeorm/subscribers"
    }
  },
  test : {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "logbook",
    password: "logbook",
    database: "logbook-test",
    migrationsRun: false,
    logging: false,
    entities: ["src/infrastructure/typeorm/schemas/**/*.ts"],
    migrations: ["src/infrastructure/typeorm/migrations/**/*.ts"],
    subscribers: ["src/infrastructure/typeorm/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/infrastructure/typeorm/schemas",
      migrationsDir: "src/infrastructure/typeorm/migrations",
      subscribersDir: "src/infrastructure/typeorm/subscribers"
    }
  },
  production : {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrationsRun: true,
    logging: false,
    entities: ["src/infrastructure/typeorm/schemas/**/*.ts"],
    migrations: ["src/infrastructure/typeorm/migrations/**/*.ts"],
    subscribers: ["src/infrastructure/typeorm/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/infrastructure/typeorm/schemas",
      migrationsDir: "src/infrastructure/typeorm/migrations",
      subscribersDir: "src/infrastructure/typeorm/subscribers"
    }
  }
}

export = connectionOptions[environment]
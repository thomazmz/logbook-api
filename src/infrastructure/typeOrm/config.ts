export const config = {
  development : {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "logbook",
    password: "logbook",
    database: "logbook",
    migrationsRun: true,
    logging: true,
  },
  test : {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "logbook",
    password: "logbook",
    database: "logbook-test",
    migrationsRun: true,
    logging: true,
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
  }
}
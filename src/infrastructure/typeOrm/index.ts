import "reflect-metadata";
import {createConnection, getCustomRepository } from "typeorm"
import { AccountRepositoryImplementation } from './repositories/AccountRepositoryImplementation'

export async function init() {
  await createConnection()
  return {
    accountRepositoryImplementation: getCustomRepository(AccountRepositoryImplementation)
  }
}
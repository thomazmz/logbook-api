import { setUpDatabase } from './typeOrm'

export async function init() {
  return await Promise.all([
    setUpDatabase()
  ])
}
import express, { Request, Response, NextFunction } from 'express'
import { json as jsonBodyParser } from 'body-parser'
import { resolveResourceRoutes } from './resources'

export async function init(port: Number = 4040) {

  // Setup api router
  const apiRouter = express.Router()
  apiRouter.use(jsonBodyParser())

  // Setup resource routers
  resolveResourceRoutes((path, router) => {
    apiRouter.use(path, router)
  })

  // Setup application router
  const applicationRouter = express.Router()
  applicationRouter.use('/api', apiRouter)

  // Setup application
  const application = express()
  application.use(applicationRouter)
  application.use(errorHandler)

  // Run application
  application.listen(port, () => {
    console.log(`Application successfully listen on port ${port}`)
  })
}

// Error Handling
export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  response.status(500).send(error.message);
}
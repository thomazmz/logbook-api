import request from 'supertest'
import express, { Express, Router } from 'express'
import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { AuthorizationController } from './authorizationController'
import { authorizationRouterFactory } from './authorizationRouterFactory'

describe('AuthorizationRouter tests', () => {

  let authorizationController: Mock<AuthorizationController>
  let authorizationRouter: Router
  let application: Express

  beforeEach(async () => {
    authorizationController = createMock<AuthorizationController>()
    authorizationRouter = authorizationRouterFactory(authorizationController);
    application = express();
    application.use(authorizationRouter);
  })

  test('GET / should call authorizationController.findAll', async () => {
    // Given
    authorizationController.findAll.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).get('/')
    // Then 
    expect(authorizationController.findAll).toHaveBeenCalled()
  })
})
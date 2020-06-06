import request from 'supertest'
import express, { Express, Router } from 'express'
import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { AccountController } from './accountController'
import { accountRouterFactory } from './accountRouterFactory'

describe('AccountRouter tests', () => {

  let accountController: Mock<AccountController>
  let accountRouter: Router
  let application: Express

  beforeEach(async () => {
    accountController = createMock<AccountController>()
    accountRouter = accountRouterFactory(accountController);
    application = express();
    application.use(accountRouter);
  })

  test('POST / should call accountController.create', async () => {
    // Given
    accountController.create.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).post('/')
    // Then
    expect(accountController.create).toHaveBeenCalled()
  })

  test('GET /:id should call accountController.findOne', async () => {
    // Given
    accountController.findOne.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).get('/1')
    // Then
    expect(accountController.findOne).toHaveBeenCalled()
  })
})
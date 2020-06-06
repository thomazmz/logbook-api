import request from 'supertest'
import express, { Express, Router } from 'express'
import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { RoleController } from './roleController'
import { roleRouterFactory } from './roleRouterFactory'

describe('RoleRouter tests', () => {

  let roleController: Mock<RoleController>
  let roleRouter: Router
  let application: Express

  beforeEach(async () => {
    roleController = createMock<RoleController>()
    roleRouter = roleRouterFactory(roleController);
    application = express();
    application.use(roleRouter);
  })

  test('GET / should call roleController.findAll', async () => {
    // Given
    roleController.findAll.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).get('/')
    // Then
    expect(roleController.findAll).toHaveBeenCalled()
  })

  test('POST / should call roleController.create', async () => {
    // Given
    roleController.create.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).post('/')
    // Then
    expect(roleController.create).toHaveBeenCalled()
  })

  test('GET /:id should call roleController.findOne', async () => {
    // Given
    roleController.findOne.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).get('/1')
    // Then
    expect(roleController.findOne).toHaveBeenCalled()
  })

  test('PATCH /:id should call roleController.update', async () => {
    // Given
    roleController.update.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).patch('/1')
    // Then
    expect(roleController.update).toHaveBeenCalled()
  })

  test('GET /:id/authorizations should call roleController.getAuthorizations', async () => {
    // Given
    roleController.getAuthorizations.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).get('/1/authorizations')
    // Then
    expect(roleController.getAuthorizations).toHaveBeenCalled()
  })

  test('PUT /:id/authorizations should call roleController.updateAuthorizations', async () => {
    // Given
    roleController.updateAuthorizations.mockImplementation((req, res) => res.sendStatus(200))
    // When
    await request(application).put('/1/authorizations')
    // Then
    expect(roleController.updateAuthorizations).toHaveBeenCalled()
  })
})
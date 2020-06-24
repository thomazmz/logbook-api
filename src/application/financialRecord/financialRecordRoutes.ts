import { Router } from 'express'
import * as financialRecordControllers from './financialRecordControllers'

export const financialRecordRoutes = (contextResolver: <T>(...args: any) => T): Router => {
  const financialRecordRoutes = Router()
  financialRecordRoutes.get('/', contextResolver(financialRecordControllers.findAll))
  financialRecordRoutes.post('/', contextResolver(financialRecordControllers.create))
  financialRecordRoutes.get('/:id', contextResolver(financialRecordControllers.findOne))
  financialRecordRoutes.patch('/:id', contextResolver(financialRecordControllers.update))
  return financialRecordRoutes
}
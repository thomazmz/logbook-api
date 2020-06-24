import { RequestHandler } from 'express'
import { FinancialRecordService } from '../../domain'

export const findAll = (financialRecordService: FinancialRecordService): RequestHandler => {
  return (req, res, next) => {
    res.status(501).send()
  }
}

export const create = (financialRecordService: FinancialRecordService): RequestHandler => {
  return (req, res, next) => {
    res.status(501).send()
  }
}

export const findOne = (financialRecordService: FinancialRecordService): RequestHandler => {
  return (req, res, next) => {
    res.status(501).send()
  }
}


export const update = (financialRecordService: FinancialRecordService): RequestHandler => {
  return (req, res, next) => {
    res.status(501).send()
  }
}
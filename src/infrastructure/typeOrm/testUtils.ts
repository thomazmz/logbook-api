import { v4 as uuid } from 'uuid'
import { AuthorizationPartial } from '../../domain/authorization/authorization'
import { AccountPartial } from '../../domain/account/account'
import { RolePartial } from '../../domain/role/role'
import { FinancialRecordPartial } from '../../domain'

export function generateAccountPartial(): AccountPartial {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    emailAddress: `some@email.com_${identifier}` 
  }
}

export function generateAuthorizationPartial(): AuthorizationPartial {
  const identifier = uuid()
  return {
    name: `validAuthorization_${identifier}`
  }
}

export function generateRolePartial(): RolePartial {
  const identifier = uuid()
  return {
    name: `validAuthorization_${identifier}`
  }
}

export function generateFinancialRecordPartial(financialRecordParial: FinancialRecordPartial): FinancialRecordPartial {
  const identifier = uuid()
  return {
    title: financialRecordParial?.title ? financialRecordParial.title : `title_${identifier}`,
    value: financialRecordParial?.value ? financialRecordParial.value : 0,
    dueAt: financialRecordParial?.dueAt ? financialRecordParial.dueAt : new Date(),
    paidAt: financialRecordParial?.paidAt ? financialRecordParial.paidAt : new Date(),
  }
}
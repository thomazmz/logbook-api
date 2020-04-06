import { init as setUpInfrastructure } from './infrastructure'
import { init as setupApplication } from './application'

setUpInfrastructure()
  .then(() => setupApplication()) 
  .catch(err => { console.log(err)})
import { setUpInfrastructure } from './infrastructure'
import { setUpApplication} from './application'

setUpInfrastructure()
  .then(() => setUpApplication()) 
  .catch(err => { console.log(err) })
import { RoleService } from "../../domain";
import { RoleController } from './RoleController'

export const roleControllerFactory = (roleService: RoleService): RoleController => ({

  findAll(request, response, next) { 
    roleService.findAll()
      .then(roles => response.status(200).send(roles))
      .catch((error) => next(error))
  },

  create(request, response, next) {
    const { name, authorizations } = request.body
    roleService.create({ name, authorizations })
      .then((role) => response.status(200).send(role))
      .catch((error) => next(error))
  },

  findOne(request, response, next) {
    const id = parseInt(request.params.id)
    roleService.findById(id)
      .then((role) => response.status(200).send(role))
      .catch((error) => next(error))
  },

  update(request, response, next) { 
    const id = parseInt(request.params.id)
    const { name } = request.body
    roleService.update({ id, name })
      .then((role) => response.status(200).send(role))
      .catch((error) => next(error))
  },

  getAuthorizations(request, response, next) {
    const id = parseInt(request.params.id)
    roleService.getAuthorizations(id)
      .then((authorizations) => response.status(200).send(authorizations))
      .catch((error) => next(error))
  },

  updateAuthorizations(request, response, next) {
    const id = parseInt(request.params.id)
    const authorizations = request.body
    roleService.updateAuthorizations({ id, authorizations})
      .then((role) => response.status(200).send(role.authorizations))
      .catch((error) => next(error))
  }
})
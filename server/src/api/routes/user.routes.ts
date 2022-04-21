import { Router } from 'express'

import {
  catchAsync,
  validateRequest,
  allowOnlyRegisteredUsers,
  allowOnlyAdmin
} from '../../middleware'
import { UserController } from '../controller'

const router = Router()

router.route('/').get(catchAsync(UserController.getUsers))

router
  .route('/me')
  .get(allowOnlyRegisteredUsers, catchAsync(UserController.getWhoAmI))
  .put(
    allowOnlyRegisteredUsers,
    validateRequest('userUpdate'),
    catchAsync(UserController.updateFields)
  )
  .delete(
    allowOnlyRegisteredUsers,
    catchAsync(UserController.deleteMyAccountAndAllMyCommunities)
  )

router
  .route('/:userId')
  .put(
    allowOnlyAdmin,
    validateRequest('updateBlocked'),
    catchAsync(UserController.updateBlockedStatus)
  )

export default router

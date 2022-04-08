import { Router } from 'express'

import { catchAsync } from '../../middleware'
import {
  allowOnlyGuests,
  allowOnlyRegisteredUsers
} from '../../middleware/auth'
import { validateRequest } from '../../middleware/validation'
import { UserController, CommunityController } from '../controller'

const router = Router()

router
  .route('/register')
  .post(
    allowOnlyGuests,
    validateRequest('registration'),
    catchAsync(UserController.apiCreateUser)
  )

router
  .route('/communities')
  .post(
    allowOnlyRegisteredUsers,
    validateRequest('community'),
    catchAsync(CommunityController.apiCreateCommunity)
  )

export default router

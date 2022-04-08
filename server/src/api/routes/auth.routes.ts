import { Router } from 'express'

import { catchAsync } from '../../middleware'
import {
  allowOnlyGuests,
  allowOnlyRegisteredUsers
} from '../../middleware/auth'
import { validateRequest } from '../../middleware/validation'
import {
  AuthController,
  CommunityController,
  UserController
} from '../controller'

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

router
  .route('/login')
  .post(
    allowOnlyGuests,
    validateRequest('login'),
    catchAsync(AuthController.apiLoginUser)
  )

export default router

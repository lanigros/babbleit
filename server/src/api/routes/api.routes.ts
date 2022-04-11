import { Router } from 'express'

import { allowOnlyGuests, catchAsync, validateRequest } from '../../middleware'
import { AuthController } from '../controller'

const router = Router()

router
  .route('/register')
  .post(
    allowOnlyGuests,
    validateRequest('registration'),
    catchAsync(AuthController.apiRegisterUser)
  )

router
  .route('/login')
  .post(
    allowOnlyGuests,
    validateRequest('login'),
    catchAsync(AuthController.apiLoginUser)
  )

export default router

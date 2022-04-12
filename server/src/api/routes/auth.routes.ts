import { Router } from 'express'

import { catchAsync } from '../../middleware'
import { allowOnlyGuests } from '../../middleware/auth'
import { validateRequest } from '../../middleware/validation'
import { AuthController } from '../controller'

const router = Router()

router
  .route('/register')
  .post(
    allowOnlyGuests,
    validateRequest('registration'),
    catchAsync(AuthController.apiRegisterUser)
  )

export default router

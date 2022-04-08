import { Router } from 'express'

import { catchAsync } from '../../middleware'
import { allowOnlyGuests } from '../../middleware/auth'
import { validateRequest } from '../../middleware/validation'
import { UserController } from '../controller'

const router = Router()

router
  .route('/register')
  .post(
    allowOnlyGuests,
    validateRequest('registration'),
    catchAsync(UserController.apiCreateUser)
  )

export default router

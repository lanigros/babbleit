import { Router } from 'express'

import { CommunityController } from '../controller'
import { allowOnlyRegisteredUsers } from '../../middleware/auth'
import { validateRequest } from '../../middleware/validation'
import { catchAsync } from '../../middleware'

const router = Router()

router
  .route('/')
  .post(
    allowOnlyRegisteredUsers,
    validateRequest('community'),
    catchAsync(CommunityController.createCommunity)
  )

export default router

import { Router } from 'express'

import { allowOnlyAdmin, catchAsync, validateRequest } from '../../middleware'
import { AdminController } from '../controller'

const router = Router()

router
  .route('/users/:userId')
  .put(
    allowOnlyAdmin,
    validateRequest('blockUser'),
    catchAsync(AdminController.blockUser)
  )

export default router

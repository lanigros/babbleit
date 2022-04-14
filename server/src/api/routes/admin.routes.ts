import { Router } from 'express'

import { allowOnlyAdmin, catchAsync } from '../../middleware'
import { AdminController } from '../controller'

const router = Router()

router
  .route('/users/:userId')
  .put(allowOnlyAdmin, catchAsync(AdminController.blockUser))

export default router

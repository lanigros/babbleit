import { Router } from 'express'

import { allowOnlyAdmin, catchAsync } from '../../middleware'
import { AdminController } from '../controller'

const router = Router()

router.route('/block/user/:userId').post(catchAsync(AdminController.blockUser))

export default router

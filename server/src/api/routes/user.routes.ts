import { Router } from 'express'

import { catchAsync } from '../../middleware'
import { UserController } from '../controller'

const router = Router()

router.route('/me').get(catchAsync(UserController.getWhoAmI))

export default router

import { Router } from 'express'

import { CommunityController } from '../controller'
import {
  validateRequest,
  catchAsync,
  addCommunityAdminRole,
  allowOnlyRegisteredUsers
} from '../../middleware'

const router = Router()

router
  .route('/')
  .post(
    allowOnlyRegisteredUsers,
    validateRequest('community'),
    catchAsync(CommunityController.createCommunity)
  )

router.route('/').get(catchAsync(CommunityController.getCommunities))

router
  .route('/:id')
  .get(addCommunityAdminRole, catchAsync(CommunityController.getCommunity))

export default router

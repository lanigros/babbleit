import { Router } from 'express'

import { CommunityController, PostController } from '../controller'
import {
  validateRequest,
  catchAsync,
  addCommunityAdminRole,
  allowOnlyRegisteredUsers,
  allowOnlyCommunityAdminsAndAdmins,
  allowOnlyCommunityMembers
} from '../../middleware'
import communityController from '../controller/community.controller'

const router = Router()

router
  .route('/')
  .get(catchAsync(CommunityController.getCommunities))
  .post(
    allowOnlyRegisteredUsers,
    validateRequest('createCommunity'),
    catchAsync(CommunityController.createCommunity)
  )

router
  .route('/:id')
  .get(addCommunityAdminRole, catchAsync(CommunityController.getCommunity))
  .delete(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    catchAsync(CommunityController.deleteCommunity)
  )

router
  .route('/:id/moderators')
  .post(
    addCommunityAdminRole,
    validateRequest('userId'),
    catchAsync(communityController.postModerator)
  )

router
  .route('/:id/moderators/:userId')
  .delete(
    addCommunityAdminRole,
    catchAsync(communityController.deleteModerator)
  )

router
  .route('/:id/members')
  .post(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    validateRequest('userId'),
    catchAsync(CommunityController.addCommunityMember)
  )
  .delete(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    validateRequest('userId'),
    catchAsync(CommunityController.removeCommunityMember)
  )

router
  .route('/:id/join')
  .post(allowOnlyRegisteredUsers, catchAsync(CommunityController.joinCommunity))

router
  .route('/:id/leave')
  .delete(
    allowOnlyRegisteredUsers,
    catchAsync(CommunityController.leaveCommunity)
  )
router
  .route('/:id/posts')
  .get(catchAsync(PostController.getAllPostsInCommunity))
  .post(
    allowOnlyRegisteredUsers,
    allowOnlyCommunityMembers,
    catchAsync(PostController.createPost)
  )

export default router

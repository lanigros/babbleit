import { Router } from 'express'

import { CommunityController, PostController } from '../controller'
import {
  validateRequest,
  catchAsync,
  addCommunityAdminRole,
  allowOnlyRegisteredUsers,
  allowOnlyCommunityAdminsAndAdmins,
  allowAllCommunityRoles,
  allowAllAdminRoles,
  allowOnlyAdmin
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
  .put(
    validateRequest('communityUpdate'),
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    catchAsync(CommunityController.updateBaseCommunity)
  )

router
  .route('/:id/blocked')
  .put(
    allowOnlyAdmin,
    validateRequest('updateBlocked'),
    catchAsync(CommunityController.updateBlockedStatus)
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
  .get(addCommunityAdminRole, catchAsync(CommunityController.getMembers))
  .post(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    validateRequest('userId'),
    catchAsync(CommunityController.addCommunityMember)
  )

router
  .route('/:id/members/:userId')
  .delete(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
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
  .get(addCommunityAdminRole, catchAsync(PostController.getPostsInCommunity))
  .post(
    allowOnlyRegisteredUsers,
    addCommunityAdminRole,
    allowAllCommunityRoles,
    validateRequest('createPost'),
    catchAsync(PostController.createPost)
  )

router
  .route('/:id/posts/:postId')
  .get(allowOnlyRegisteredUsers, catchAsync(PostController.getPost))
  .put(
    allowOnlyRegisteredUsers,
    addCommunityAdminRole,
    allowAllCommunityRoles,
    validateRequest('updatePost'),
    catchAsync(PostController.updatePost)
  )
  .delete(
    allowOnlyRegisteredUsers,
    addCommunityAdminRole,
    allowAllCommunityRoles,
    catchAsync(PostController.deletePost)
  )

router
  .route('/:id/posts/:postId/blocked')
  .put(
    allowOnlyRegisteredUsers,
    addCommunityAdminRole,
    allowAllAdminRoles,
    validateRequest('updateBlocked'),
    catchAsync(PostController.updateBlockedStatus)
  )

export default router

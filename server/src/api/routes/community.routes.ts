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
  allowOnlyAdmin,
  validateParamsId
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
  .all(validateParamsId)
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
  .all(validateParamsId)
  .put(
    allowOnlyAdmin,
    validateRequest('updateBlocked'),
    catchAsync(CommunityController.updateBlockedStatus)
  )

router
  .route('/:id/moderators')
  .all(validateParamsId)
  .get(addCommunityAdminRole, catchAsync(communityController.getModerators))
  .post(
    addCommunityAdminRole,
    validateRequest('userId'),
    catchAsync(communityController.postModerator)
  )

router
  .route('/:id/moderators/:userId')
  .all(validateParamsId)
  .delete(
    addCommunityAdminRole,
    catchAsync(communityController.deleteModerator)
  )

router
  .route('/:id/members')
  .all(validateParamsId)
  .get(addCommunityAdminRole, catchAsync(CommunityController.getMembers))
  .post(
    addCommunityAdminRole,
    allowAllAdminRoles,
    validateRequest('userId'),
    catchAsync(CommunityController.addCommunityMember)
  )

router
  .route('/:id/members/:userId')
  .all(validateParamsId)
  .delete(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    catchAsync(CommunityController.removeCommunityMember)
  )

router
  .route('/:id/join')
  .all(validateParamsId)
  .post(allowOnlyRegisteredUsers, catchAsync(CommunityController.joinCommunity))

router
  .route('/:id/leave')
  .all(validateParamsId)
  .delete(
    allowOnlyRegisteredUsers,
    catchAsync(CommunityController.leaveCommunity)
  )

router
  .route('/:id/posts')
  .all(validateParamsId)
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
  .all(validateParamsId)
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
  .all(validateParamsId)
  .put(
    allowOnlyRegisteredUsers,
    addCommunityAdminRole,
    allowAllAdminRoles,
    validateRequest('updateBlocked'),
    catchAsync(PostController.updateBlockedStatus)
  )

export default router

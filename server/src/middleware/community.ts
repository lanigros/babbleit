import { Types } from 'mongoose'
import { NextFunction, Request, Response } from 'express'

import { CommunityAdminModel, CommunityModel } from '../api/model'
import { Role } from '../types'
import { Unauthorized } from '../errors'

export async function addCommunityAdminRole(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return next()
  }

  const result = await CommunityAdminModel.aggregate<Role>([
    {
      $match: {
        userId: new Types.ObjectId(req.session.userId)
      }
    },
    {
      $match: {
        'roles.communityId': new Types.ObjectId(req.params.id)
      }
    },
    { $unwind: '$roles' },
    { $replaceRoot: { newRoot: '$roles' } },
    { $limit: 1 }
  ])

  req.communityAdminRole = result[0]?.role
  next()
}

export async function allowOnlyCommunityAdminsAndAdmins(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!(req.session.isAdmin || req.communityAdminRole === 'admin')) {
    next(
      new Unauthorized(
        'You must be an admin of the page or community to access this route'
      )
    )
  }
  next()
}

export async function allowAllAdminRoles(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!(req.session.isAdmin || req.communityAdminRole)) {
    next(
      new Unauthorized(
        'You must be an admin or moderator of the page or community to access this route'
      )
    )
  }
  next()
}

export async function allowAllCommunityRoles(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (req.communityAdminRole || req.session.isAdmin) {
    return next()
  }

  const existingMember = await CommunityModel.exists({
    _id: req.params.id,
    'members.userId': req.session.userId
  })

  if (!existingMember && !req.communityAdminRole) {
    next(new Unauthorized('You must be a member to post in this community'))
  }

  next()
}

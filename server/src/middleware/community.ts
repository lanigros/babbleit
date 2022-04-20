import { Types } from 'mongoose'
import { NextFunction, Request, Response } from 'express'

import { CommunityAdminModel } from '../api/model'
import { Role } from '../types'

export async function addCommunityAdminRole(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return next()
  }

  await CommunityAdminModel.aggregate<Role>([
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
  ]).exec((error, result) => {
    if (error) {
      console.error(error)
      throw new Error('Oops, something went wrong')
    }
    req.communityAdminRole = result[0]?.role
  })
  console.log('admin', req.communityAdminRole)
  next()
}

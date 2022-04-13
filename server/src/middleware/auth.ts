import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import { Unauthorized } from '../errors'
import { CommunityAdminModel } from '../api/model'
import { Role } from '../types'

export function allowOnlyGuests(req: Request, _: Response, next: NextFunction) {
  if (req.session.userId) {
    next(new Unauthorized('Only guests allowed'))
  }

  next()
}

export function allowOnlyRegisteredUsers(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    next(new Unauthorized('You need to be a registered user'))
  }
  next()
}

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
        'roles.communityId': new Types.ObjectId(req.params.path)
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
    req.communityAdminRole = result[0]
  })
}

export function allowOnlyAdmin(req: Request, _: Response, next: NextFunction) {
  console.log(req.session.isAdmin)
  if (!req.session.isAdmin) {
    next(new Unauthorized('You need to be admin'))
  }
  next()
}

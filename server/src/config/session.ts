import { SessionOptions } from 'express-session'

import { IN_PRODUCTION } from './environment'

const TEN_DAYS = 1000 * 60 * 60 * 24 * 10

export const {
  SESSION_SECRET = 'secret',
  SESSION_NAME = 'sid',
  SESSION_LIFETIME = TEN_DAYS
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_LIFETIME,
    secure: IN_PRODUCTION,
    sameSite: IN_PRODUCTION ? 'none' : 'lax'
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}

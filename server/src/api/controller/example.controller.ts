import { Request, Response } from 'express'

import { getHello } from '../service'

const apiGetHello = async (_: Request, res: Response) => {
  const hello = await getHello()
  res.json(hello)
}

const ExampleController = {
  apiGetHello
}

export default ExampleController

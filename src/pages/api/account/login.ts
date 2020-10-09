import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import container from '../../../lib/container';
import * as app from '../../../lib/application';
import {ERROR_MESSAGE} from '../../../lib/application/constants';
import {sign} from 'jsonwebtoken';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ser = container.get<app.application_interfaces.IAuthenticationService>(app.A_TYPES.IAuthenticationService)
  

  if (req.method === 'POST') {
    let output = await ser.authenticate(
      {
          email: req.body.email,
          password: req.body.password
      }
    )

    // Error checking, revise if error message is changed
    if ( output.status === ERROR_MESSAGE ) {
      res.status(400)
    }

    else{
        res.setHeader('Set-Cookie', output.data);
        res.status(200)
        output.data = null
    }
      res.json(output) 
  }
   else {
    res.status(405).json({ message: 'We only support POST' });
  }
}
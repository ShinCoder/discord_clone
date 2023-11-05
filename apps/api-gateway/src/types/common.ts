import { Request } from 'express';

import { IJwtPayload } from '@prj/common';

export interface IRequestWithUser extends Request {
  user: IJwtPayload;
}

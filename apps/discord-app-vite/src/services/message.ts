import { apiClientWithAuth } from './client';

import {
  IGetDirectMessagesQuery,
  IGetDirectMessagesResult
} from '@prj/types/api';

export const getDirectMessages = (options: IGetDirectMessagesQuery) => {
  return apiClientWithAuth.get<IGetDirectMessagesResult>('/direct-messages', {
    params: options
  });
};

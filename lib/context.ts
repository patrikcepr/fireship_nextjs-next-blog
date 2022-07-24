import { createContext } from 'react';

import { IUserContext } from '../types/contextTypes';

export const UserContext = createContext<IUserContext>({
  user: null,
  username: null,
});

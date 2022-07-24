interface User {
  uid: string | undefined;
  photoURL?: string | null;
  displayName?: string | null | undefined;
}

export interface IUserContext {
  user: User | null | undefined;
  username: string | null;
}

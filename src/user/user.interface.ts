import { User } from './schema/user.schema';

export interface UserInterface {
  Login(user: User): Promise<object>;

  Logout(session: string): Promise<object>;

  Check(session: string): Promise<object>;

  Create(user: User): Promise<object>;
}

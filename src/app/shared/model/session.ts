import { User } from './user';

export interface Session {
    sessionToken: string;
    user: User;

}

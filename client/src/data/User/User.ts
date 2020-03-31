import AnonymousUser from './AnonymousUser';

export default class User extends AnonymousUser {
  name: string;

  email: string;

  constructor(uid: string, name: string, email: string) {
    super(uid);

    this.name = name;
    this.email = email;
  }
}

import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCollection from '@/data/Database/UserCollection';
import User from './User';
import AnonymousUser from './AnonymousUser';

export default class AuthController {
  currentUser?: User | AnonymousUser;

  async signInWithTempAccount() {
    const userCred = await firebase.auth().signInAnonymously();

    if (!userCred.user) {
      throw new Error('User is not defined');
    }
    this.currentUser = new AnonymousUser(userCred.user.uid);

    return this.currentUser as AnonymousUser;
  }

  async signInWithPermanentAccount(email: string, password: string) {
    const userCred = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (!userCred.user) {
      throw new Error('User is not defined');
    }

    this.currentUser = await AuthController.getUserFromDatabase(userCred.user.uid);

    return this.currentUser as User;
  }

  private static async getUserFromDatabase(uid: string): Promise<User> {
    const userCollectionConnection = new UserCollection();
    const user = await userCollectionConnection.getUserFromId(uid);

    return new User(uid, user.name, user.email);
  }
}

const authController = new AuthController();

export { authController };

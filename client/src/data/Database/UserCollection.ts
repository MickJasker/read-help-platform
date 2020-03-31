import Database from './Database';

import DocumentData = firebase.firestore.DocumentData;

export interface UserDocumentData extends DocumentData {
  name: string;
  email: string;
}

export default class UserCollection extends Database {
  constructor() {
    super('/user');
  }

  async getUserFromId(uid: string) {
    const snapshot = await this.rootCollection.doc(uid).get();

    if (!snapshot.data()) {
      throw new Error('No data is found');
    }

    return snapshot.data() as UserDocumentData;
  }
}

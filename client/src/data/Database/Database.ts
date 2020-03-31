import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Firestore = firebase.firestore.Firestore;

export default class Database {
  protected dbInstance: Firestore = firebase.firestore();

  public rootCollection: firebase.firestore.CollectionReference;

  constructor(rootCollection: string) {
    this.rootCollection = this.dbInstance.collection(rootCollection);
  }
}

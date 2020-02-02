import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyBnVrvvHqEFwDhUfwNXDyh36M53JIB_b74',
  authDomain: 'todo-e1896.firebaseapp.com',
  databaseURL: 'https://todo-e1896.firebaseio.com',
  projectId: 'todo-e1896',
  storageBucket: 'todo-e1896.appspot.com',
  messagingSenderId: '1079123358336',
  appId: '1:1079123358336:web:e6a096eebad27a1738ac65'
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresense(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    // online
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore
    });
  });
}

export { db, firebase };

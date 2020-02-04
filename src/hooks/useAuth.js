import { useEffect, useState } from 'react';

import { firebase, db } from '../firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // Get Firebase Auth Data
        const authUser = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };

        // Set Firestore with Auth data
        db.collection('users')
          .doc(authUser.uid)
          .set(authUser, { merge: true });

        // Fetch extended user data from Firestore
        db.doc(`/users/${authUser.uid}`).onSnapshot(doc => {
          setUser({
            ...doc.data(),
            userRef: doc.ref
          });
        });
        // setupPresense(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

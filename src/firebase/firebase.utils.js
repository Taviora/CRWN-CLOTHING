import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config =  {
    apiKey: "AIzaSyAimCdgb2052kA2qsBqYvqzr_ZgC8KJ1nA",
    authDomain: "crown-db-42410.firebaseapp.com",
    databaseURL: "https://crown-db-42410.firebaseio.com",
    projectId: "crown-db-42410",
    storageBucket: "crown-db-42410.appspot.com",
    messagingSenderId: "200931727861",
    appId: "1:200931727861:web:c0ea2cd83d9fd4776728bc",
    measurementId: "G-E1XEN4XKHS"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);


    const snapShot = await userRef.get();

   
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error) {
        console.log('error creating user',error.message);
      }

    }

    return userRef;
    
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
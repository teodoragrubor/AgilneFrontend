import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBXFUKEg1w2BxEQRloeBghGg_zbxmPm0AU',
  authDomain: 'teodora-lashes.firebaseapp.com',
  databaseURL: 'https://teodora-lashes-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'teodora-lashes',
  storageBucket: 'teodora-lashes.appspot.com',
  messagingSenderId: '931157798018',
  appId: '1:931157798018:web:a4e973e76bdf18180b989b',
})

export const auth = app.auth()
export const database = app.database()
export default app
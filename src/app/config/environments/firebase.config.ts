import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
export const firebaseConfig = {
  apiKey: "AIzaSyAtl39d2egZAW9MoxpFSuEjyXs1wamas1c",
  authDomain: "auction-system-dd0d5.firebaseapp.com",
  databaseURL: "https://auction-system-dd0d5.firebaseio.com",
  storageBucket: "auction-system-dd0d5.appspot.com"
};
export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

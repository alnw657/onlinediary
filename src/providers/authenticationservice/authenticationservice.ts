// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthenticationserviceProvider {
  public userid: string;
  public useremail: string;
  constructor() {
      const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.userid = '';
          this.useremail = '';
          unsubscribe();
        } else {
          this.useremail = user.email;
          this.userid = user.uid;
          unsubscribe();
        }
      });
  }
  
  login( email: string, password: string ): Promise <any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      //write data under /userProfile using the user's id as key
      firebase.database().ref('/userProfile').child(newUser.uid).set({ email: email });
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}

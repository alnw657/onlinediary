import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { AuthenticationserviceProvider } from '../authenticationservice/authenticationservice';
//import the note class to be able to use it to create new notes
import { Story } from '../../models/story';

/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataserviceProvider {
  public notes: Array<Story>;
  public userid: string;
  public path: string;
  constructor(public http: HttpClient, private auth:AuthenticationserviceProvider) {

  }
  getNotes(userid,callback){
    //create path to access Notes
    let path = '/userProfile/' + userid + '/notes/';
    firebase.database().ref(path).once('value').then( (snapshot) => {
      callback( snapshot.val() );
    });
  }
  createNote(data,userid){
    //create a new note usin the class in /models/note.ts and the data passed from home.ts
    let story = new Story( data.title, data.text);
    let path = '/userProfile/' +userid + '/notes/';
   
    firebase.database().ref(path).child(<string><any>story.created).set(story);
  }
  updateNote(data,userid,callback){
    let notedata = {title: data.title, note: data.text, created: data.created }
    let path = '/userProfile/' +userid + '/notes/' + (<string> data.created);
    firebase.database().ref(path).update(notedata).then( callback() );
  }
  deleteNote( id, userid, callback ){
    let path = '/userProfile/' +userid + '/notes/' + id;
    firebase.database().ref(path).set(null).then( callback() );
  }
}

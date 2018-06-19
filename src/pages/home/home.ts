import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import firebase from 'firebase';

import { AuthenticationserviceProvider } from '../../providers/authenticationservice/authenticationservice';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AuthenticationPage } from '../authentication/authentication';
import { CreatestoryPage } from '../createstory/createstory';

import {Story} from '../../models/story';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userid: string;
  notes: Array <Story> = [];
  constructor(public navCtrl: NavController,
    public authenticationservice: AuthenticationserviceProvider,
    private modalCtrl: ModalController,
    private dataservice:DataserviceProvider)
  {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.userid = user.uid;
        this.dataservice.userid = user.uid;
        //get handle inside function for this.notes
        this.dataservice.getNotes(this.userid, (notes) => {
          if(notes){
            this.renderNotes(notes);
          }

        });
      }
      else {
        //user is not signed in
      }
    });
  }
  openCreateModal(modeobj){
    let md = this.modalCtrl.create( CreatestoryPage, modeobj );
    //add a listener for when the modal is closed
    md.onDidDismiss( (data) => {
      //save the data to firebase usin the DataserviceProvider
      if(data){
        if(data.mode == 'add'){
          this.dataservice.createNote(data,this.userid);
          this.dataservice.getNotes(this.userid,(notes) => {
            this.renderNotes(notes);
          });
        }
        if(data.mode == 'edit'){
          this.dataservice.updateNote( data, this.userid, () => {
            this.dataservice.getNotes( this.userid, (notes) => {
              this.renderNotes(notes);
            });
          });
        }
      }

    });
    md.present();
  }
  renderNotes(notes){
    //count the number of objects using the keys
    var count = Object.keys(notes).length;
    //get the keys of objects and store in keys array
    var keys = Object.keys(notes);
    this.notes = [];
    for(let i:number =0; i< count; i++){
      this.notes.push( notes[ keys[i] ]);
    }
  }

  delete( id ){
    this.dataservice.deleteNote(id, this.userid , () => {
      this.dataservice.getNotes(this.userid,(notes) => {
        this.renderNotes(notes);
      });
    });

  }
}

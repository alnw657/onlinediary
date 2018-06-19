import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CreatenotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createstory',
  templateUrl: 'createstory.html',
})
export class CreatestoryPage {
  noteForm : FormGroup;
  //to store the form data ngModels
  title: string;
  text: string;
  mode: string;
  created: string;
  constructor(public navCtrl:NavController, public navParams:NavParams, public viewCtrl:ViewController, private formBuilder: FormBuilder) {
    //create validator for the note form
    this.noteForm = this.formBuilder.group({
      title: ['',Validators.compose([
        //the field is required
          Validators.required,
          //the minimum length is 4 characters
          Validators.minLength(4)
        ])
      ],
      text: ['',Validators.compose([
          Validators.required
        ])
      ]
    });
    //get mode
    this.mode = navParams.data.mode;
    console.log(this.mode);
    if(navParams.data.mode == 'edit'){
      this.mode = navParams.data.mode;
      this.title = navParams.data.title;
      this.text = navParams.data.text;
      this.created = navParams.data.created;
    }
  }

  ionViewDidLoad() {

  }
  closeModal(){
    //user cancels so don't pass any data
    this.viewCtrl.dismiss();
  }
  saveNote(){
    let data = {};
    if( this.mode == 'add' ){
      //get the note title and text from the page's ngModels
      data = {title: this.title, text: this.text, mode: this.mode };
    }
    if( this.mode == 'edit' ){
      data = {title: this.title, text: this.text, mode: this.mode, created: this.created }
    }
    //pass the data when the modal is closed
    this.viewCtrl.dismiss(data);
  }
}

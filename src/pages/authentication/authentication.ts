import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//we use a modal to show terms and conditions
import { ModalController } from 'ionic-angular';
//we use the tcmodal page as content for our modal to show the terms and conditions
import { TcmodalPage } from '../tcmodal/tcmodal';
import { HomePage } from '../home/home';

import { AuthenticationserviceProvider } from '../../providers/authenticationservice/authenticationservice';

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  loginForm : FormGroup;
  registerForm: FormGroup;

  //default form to show is login
  private state: string = 'login';
  public title: string = 'Sign In';
  private tnc_accept: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              public auth: AuthenticationserviceProvider,
              private formBuilder: FormBuilder ) {
    //validate register form
    this.registerForm = this.formBuilder.group({
      email: ['',Validators.compose([
          Validators.email,
          Validators.required
        ])
             ],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(8)])
                ],
      tnc: [false,Validators.requiredTrue]
    });
    //validate login form
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      password: ['',
        Validators.required
      ]
    });
  }

  toggleForms(){
    if( this.state == 'login' ){
      this.title = 'Sign Up';
      this.state = 'signup';
      this.loginForm.reset();
    }
    else{
      this.title = 'Sign in';
      this.state = 'login';
      this.registerForm.reset();
    }
  }
  showTC(){
    //show the Terms and Conditions modal
    //show TcmodalPage as a modal
    let tnc_data = { accept : this.tnc_accept };
    //reference to the modal controller
    let md = this.modalCtrl.create( TcmodalPage , tnc_data );
    let self = this;
    //add a listener to modal when it's dismissed to receive data
    md.onDidDismiss( (data) => {
    //if the checkbox in modal is ticked, tick the checkbox
      if( data.accept == true ){
        self.tnc_accept = data.accept;
      }
      else{
        self.tnc_accept = false;
      }
    });
    //present the modal
    md.present();
  }


  register(){
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    this.auth.register(email, password)
    .then( () => {
        this.navCtrl.setRoot(HomePage);
    },
    (error) => {
      console.log(error)
    });

  }

  login(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.auth.login( email, password )
    .then( () => {
      this.navCtrl.setRoot(HomePage);
    },
    (error) => {
      console.log(error);
    });
  }
}

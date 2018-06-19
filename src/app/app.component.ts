import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { Configuration } from '../configuration/configuration';

import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { LockPage } from '../pages/lock/lock';
import { LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  uid:string;
  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    firebase.initializeApp( Configuration.firebase );
    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = AuthenticationPage;
        this.pages = [
          { title: 'Sign In', icon: 'log-in', component: AuthenticationPage }
        ];
        user.uid = '';
      }
      else {
        this.rootPage = HomePage;
        this.pages = [
          { title: 'Diary', icon: 'book', component: HomePage },
          { title: 'Lock', icon: 'lock', component: LockPage },
          { title: 'Logout', icon: 'log-out', component: LogoutPage }
          
        ];
        
        this.uid = user.uid;
      }
    
    });
    
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

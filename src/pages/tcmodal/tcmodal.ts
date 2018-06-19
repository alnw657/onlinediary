import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tcmodal',
  templateUrl: 'tcmodal.html',
})
export class TcmodalPage {
  accept: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController ) {

  }
  ionViewWillEnter() {
    let checkbox = this.navParams.get('accept');
    this.accept = checkbox;
  }
  closeModal(){
    let data = { accept: this.accept };
    this.viewCtrl.dismiss(data);
    //this.navCtrl.pop();
  }
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatestoryPage } from './createstory';

@NgModule({
  declarations: [
    CreatestoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatestoryPage),
  ],
})
export class CreatestoryPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCreateSuccessfulPageRoutingModule } from './user-create-successful-routing.module';

import { UserCreateSuccessfulPage } from './user-create-successful.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCreateSuccessfulPageRoutingModule
  ],
  declarations: [UserCreateSuccessfulPage]
})
export class UserCreateSuccessfulPageModule {}

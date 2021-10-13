import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogosPageRoutingModule } from './logos-routing.module';

import { LogosPage } from './logos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogosPageRoutingModule
  ],
  declarations: [LogosPage]
})
export class LogosPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResenaEditPageRoutingModule } from './resena-edit-routing.module';

import { ResenaEditPage } from './resena-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResenaEditPageRoutingModule
  ],
  declarations: [ResenaEditPage]
})
export class ResenaEditPageModule {}

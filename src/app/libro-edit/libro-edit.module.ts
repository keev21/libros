import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibroEditPageRoutingModule } from './libro-edit-routing.module';

import { LibroEditPage } from './libro-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibroEditPageRoutingModule
  ],
  declarations: [LibroEditPage]
})
export class LibroEditPageModule {}

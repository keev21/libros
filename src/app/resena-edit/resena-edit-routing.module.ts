import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResenaEditPage } from './resena-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ResenaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResenaEditPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibroEditPage } from './libro-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LibroEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroEditPageRoutingModule {}

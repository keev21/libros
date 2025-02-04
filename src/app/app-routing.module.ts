import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'libro-edit',
    loadChildren: () => import('./libro-edit/libro-edit.module').then( m => m.LibroEditPageModule)
  },
  {
    path: 'resena',
    loadChildren: () => import('./resena/resena.module').then( m => m.ResenaPageModule)
  },
  {
    path: 'resena-edit',
    loadChildren: () => import('./resena-edit/resena-edit.module').then( m => m.ResenaEditPageModule)
  }
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

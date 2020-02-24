import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./impulses/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./impulses/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'create-entry',
    loadChildren: () => import('./entries/create-entry/create-entry.module').then( m => m.CreateEntryPageModule)
  },
  {
    path: 'detail-entry/:id',
    loadChildren: () => import('./entries/detail-entry/detail-entry.module').then( m => m.DetailEntryPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

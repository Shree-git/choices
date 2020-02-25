import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

 { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./userlog/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./userlog/login/login.module').then( m => m.LoginPageModule)
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
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },{
       path: 'forgot-password',
      loadChildren: () => import('./userlog/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
    },
    {
      path: 'account',
      loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
    }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

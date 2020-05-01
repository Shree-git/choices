import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaTabsPage } from './ca-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CaTabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ca-tab1/ca-tab1.module').then(m => m.CaTab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ca-tab2/ca-tab2.module').then(m => m.CaTab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ca-tab3/ca-tab3.module').then(m => m.CaTab3PageModule)
          }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contacts/contacts.module').then( m => m.ContactsPageModule)
          }
        ]
      },
      { path: '', redirectTo: 'tab2', pathMatch: 'full' },
    ]
    
  },
  { path: '', redirectTo: 'tab2', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaTabsPageRoutingModule {}

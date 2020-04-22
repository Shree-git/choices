import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentTabsPage } from './agent-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AgentTabsPage,
    children: [
      {
        path: 'agent-tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../agent-tab1/agent-tab1.module').then(m => m.AgentTab1PageModule)
          }
        ]
      },
      {
        path: 'agent-tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../agent-tab2/agent-tab2.module').then(m => m.AgentTab2PageModule)
          }
        ]
      },
      {
        path: 'agent-tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../agent-tab3/agent-tab3.module').then(m => m.AgentTab3PageModule)
          }
        ]
      },
      /*
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../account/account.module').then( m => m.AccountPageModule)
          }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../agent-contacts/agent-contacts.module').then( m => m.ContactsPageModule)
          }
        ]
      },
      */
      {
        path: '',
        redirectTo: 'agent-tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'agent-tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentTabsPageRoutingModule {}

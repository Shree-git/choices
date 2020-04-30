import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

 { path: '', redirectTo: 'login', pathMatch: 'full' },
  


///////////////////// ADMIN SIDE 
 {
  path: 'tabs-admin',
  loadChildren: () => import('./admin/tabs-admin/tabs-admin.module').then(m => m.TabsAdminPageModule)
},
{
  path: 'tab2-admin',
  loadChildren: () => import('./admin/tab2/tab2.module').then(m => m.Tab2PageModule)
},
{
  path: 'user-detail/:id',
  loadChildren: () => import('./admin/tab2/user-detail/user-detail.module').then( m => m.UserDetailPageModule)
},
{
  path: 'detail-entry-admin/:id',
  loadChildren: () => import('./admin/entries/detail-entry/detail-entry.module').then( m => m.DetailEntryPageModule)
},




///////////////////// AGENT SIDE 
{
  path: 'agent-tabs',
  loadChildren: () => import('./agent/agent-tabs/agent-tabs.module').then(m => m.AgentTabsPageModule)
},
{
  path: 'user-detail-agent/:id',
  loadChildren: () => import('./agent/agent-tab2/user-detail-agent/user-detail-agent.module').then( m => m.UserDetailAgentPageModule)
},
{
  path: 'agent-create-group',
  loadChildren: () => import('./agent/agent-groups/agent-create-group/agent-create-group.module').then( m => m.AgentCreateGroupPageModule)
},
{
  path: 'agent-detail-group/:id',
  loadChildren: () => import('./agent/agent-groups/agent-detail-group/agent-detail-group.module').then( m => m.AgentDetailGroupPageModule)
},
{
  path: 'agent-create-assignment',
  loadChildren: () => import('./agent/agent-assignments/agent-create-assignment/agent-create-assignment.module').then( m => m.AgentCreateAssignmentPageModule)
},
{
  path: 'agent-detail-assignment/:id',
  loadChildren: () => import('./agent/agent-assignments/agent-detail-assignment/agent-detail-assignment.module').then( m => m.AgentDetailAssignmentPageModule)
},
{
  path: 'agent-detail-members',
  loadChildren: () => import('./agent/members-detail-agent/members-detail-agent.module').then( m => m.AgentDetailMembersPageModule)
},
{
  path: 'agent-detail-members/:assignment',
  loadChildren: () => import('./agent/members-detail-agent/members-detail-agent.module').then( m => m.AgentDetailMembersPageModule)
},

///////////////////ADMIN TO CLIENT
{
  path: 'ca-tabs',
  loadChildren: () => import('./admin/client-admin/ca-tabs/ca-tabs.module').then(m => m.CaTabsPageModule)
},

{
  path: 'ca-detail/:id',
  loadChildren: () => import('./admin/client-admin/ca-detail/ca-detail.module').then( m => m.CaDetailPageModule)
},
 



  ///AVAILABLE TO ALL USERS
  {
    path: 'register',
    loadChildren: () => import('./userlog/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./userlog/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
   loadChildren: () => import('./userlog/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
 },


  ////////////CLIENT SIDE
  {
    path: 'tabs',
    loadChildren: () => import('./addict/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./addict/impulses/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./addict/impulses/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'create-entry',
    loadChildren: () => import('./addict/entries/create-entry/create-entry.module').then( m => m.CreateEntryPageModule)
  },
  {
    path: 'detail-entry/:id',
    loadChildren: () => import('./addict/entries/detail-entry/detail-entry.module').then( m => m.DetailEntryPageModule)
  },
    {
      path: 'create-contact',
      loadChildren: () => import('./addict/contacts/create-contact/create-contact.module').then( m => m.CreateContactPageModule)
    },
    {
      path: 'view-contact/:id',
      loadChildren: () => import('./addict/contacts/view-contact/view-contact.module').then( m => m.ViewContactPageModule)
    },
    {
      path: 'detail-assignment/:id',
      loadChildren: () => import('./addict/tab3/detail-assignments/detail-assignments/detail-assignments.module').then( m => m.DetailAssignmentsPageModule)
    },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

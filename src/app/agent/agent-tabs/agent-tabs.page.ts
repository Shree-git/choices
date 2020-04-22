import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-agent-tabs',
  templateUrl: 'agent-tabs.page.html',
  styleUrls: ['agent-tabs.page.scss']
})
export class AgentTabsPage implements OnInit{

  activePath = '';

  pages = [
    {
      name: 'Assignments',
      path: '/agent-tabs/agent-tab1'
    },
    {
      name: 'Groups',
      path: '/agent-tabs/agent-tab2'
    },
    {
      name: 'Agenda',
      path: '/agent-tabs/agent-tab3'
    },
    /*
    {
      name: 'Account',
      path: '/tabs/account'
    },
    {
      name: 'Safe Contacts',
      path: '/tabs/contacts'
    }
    */
  ]
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url;
    })
  }

  ngOnInit() {

  }
}

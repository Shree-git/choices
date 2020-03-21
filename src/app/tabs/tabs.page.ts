import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  activePath = '';

  pages = [
    {
      name: 'Journal',
      path: '/tabs/tab1'
    },
    {
      name: 'Impulses',
      path: '/tabs/tab2'
    },
    {
      name: 'Wellness',
      path: '/tabs/tab3'
    },
    {
      name: 'Account',
      path: '/tabs/account'
    },
    {
      name: 'Safe Contacts',
      path: '/tabs/contacts'
    }
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

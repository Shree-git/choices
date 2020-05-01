import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-tabs-admin',
  templateUrl: 'tabs-admin.page.html',
  styleUrls: ['tabs-admin.page.scss']
})
export class TabsAdminPage implements OnInit{

  activePath = '';

  pages = [
    {
      name: 'Assignments',
      path: '/tabs-admin/tab1'
    },
    {
      name: 'Users',
      path: '/tabs-admin/tab2'
    },
    {
      name: 'Agenda',
      path: '/tabs-admin/tab3'
    },
    {
      name: 'Account',
      path: '/tabs/account'
    },
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

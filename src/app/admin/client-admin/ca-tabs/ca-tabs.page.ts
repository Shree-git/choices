import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ca-tabs',
  templateUrl: 'ca-tabs.page.html',
  styleUrls: ['ca-tabs.page.scss']
})
export class CaTabsPage implements OnInit{

  activePath = '';

  pages = [
    {
      name: 'Impulses',
      path: '/ca-tabs/ca-tab1'
    },
    {
      name: 'Agenda',
      path: '/ca-tabs/ca-tab2'
    },
    {
      name: 'Assignments',
      path: '/ca-tabs/ca-tab3'
    },
  ]

  iID;
  constructor(
    public authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,

  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url;
    })
  }

  ngOnInit() {
    
  }

}

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
      name: 'Entries',
      path: '/tabs/tab1'
    },
    {
      name: 'Agenda',
      path: '/tabs/tab2'
    },
    {
      name: 'Goals',
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
    const userId = this.route.snapshot.paramMap.get('id');
    this.iID = userId
  }

  routeToTab1(){
    this.router.navigateByUrl('/ca-tabs/' + this.iID + '/tab1');
  }

  routeToTab2(){
    this.router.navigateByUrl('/ca-tabs/' + this.iID + '/tab2');
  }
  routeToTab3(){
    this.router.navigateByUrl('/ca-tabs/' + this.iID + '/tab3');
  }

}

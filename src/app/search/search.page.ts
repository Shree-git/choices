import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/data/firestore.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public currentEntries;
  constructor( public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public router: Router) { }

  ngOnInit() {
    this.currentEntries = this.firestoreService.getCurrentEntries().valueChanges();
  }

  /**
   * Perform a service for the proper items.
   */
  getEntries(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentEntries = [];
      return;
    }
    this.currentEntries = this.currentEntries.query({
      title: val
    });
  }

}

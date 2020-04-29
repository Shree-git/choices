import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Assignment } from '../../../../models/assignment.interface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-assignments',
  templateUrl: './detail-assignments.page.html',
  styleUrls: ['./detail-assignments.page.scss'],
})
export class DetailAssignmentsPage implements OnInit {
  public assignment: Observable<Assignment>;
  public iID;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const assignID = this.route.snapshot.paramMap.get('id');
    this.iID = assignID;
    this.assignment = this.fservice.getDetail("assignments", assignID).valueChanges();
  }

  edit = false;
  showEdit(){
    this.edit = !this.edit;
  }
 
  
}

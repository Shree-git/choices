import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../../services/data/firestore.service' 
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-agent-create-assignment',
  templateUrl: './agent-create-assignment.page.html',
  styleUrls: ['./agent-create-assignment.page.scss'],
  providers: [DatePipe],
})
export class AgentCreateAssignmentPage implements OnInit {
  public createAssignmentForm: FormGroup;
  currentDate = new Date().toISOString();
  user;
  id;
  iid;
  

  getClient(): string{
    return this.dataService.clientID
  }
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private datePipe: DatePipe,
    formBuilder: FormBuilder,
    public router: Router,
    private dataService: DataService,
    public ngFireAuth: AngularFireAuth,

    ) {
      this.createAssignmentForm = formBuilder.group({
        title: ['', Validators.required],
        desc:['', Validators.required],
       // due: ['', Validators.required],
      })

     }

  ngOnInit() {
this.user = JSON.parse(localStorage.getItem('user'));
this.id = this.user.uid;
this.iid = this.id;
console.log(this.iid)
  }

  async createAssignment(){
    const loading = await this.loadingCtrl.create();

    const title = this.createAssignmentForm.value.title;
    const desc = this.createAssignmentForm.value.desc;
    const due = this.currentDate;
    const assignerUID = this.iid
    const done = false;
    const response = null;
    const assignedTo = "o9KgRhURIph9c6PklwGEbfLi4pl1"

    this.firestoreService.createAssignment(assignerUID, assignedTo, title, desc, due, done, response)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/agent-tabs/agent-tab1');
      });
    },
      (    error: any) => {
      console.error(error);
    });
    return await loading.present();
  }

}

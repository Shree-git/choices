import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Entry } from '../../../models/entry.interface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-entry',
  templateUrl: './detail-entry.page.html',
  styleUrls: ['./detail-entry.page.scss'],
})
export class DetailEntryPage implements OnInit {
  public entry: Observable<Entry>;
  public iID;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const entryId = this.route.snapshot.paramMap.get('id');
    this.iID = entryId;
    this.entry = this.fservice.getDetail("currentEntries", entryId).valueChanges();
  }

  edit = false;
  showEdit(){
    this.edit = !this.edit;
  }
  async deleteEntry(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this entry?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: ca => {
          console.log('cancel ca');
        },
      },
      {
        text: 'Delete',
        handler: () => {
          this.fservice.delete("currentEntries", this.iID);
          this.router.navigateByUrl('tabs/tab1');
        },
      },
    ],
    });

    (await alert).present();
  }

  editEntry(){
    let entryid = this.route.snapshot.paramMap.get('id');
    let new_title = (<HTMLInputElement>document.getElementById("edited-title")).value;
    let new_content = (<HTMLInputElement>document.getElementById("edited-content")).value;    
    
    this.fservice.editEntry(entryid, new_title, new_content);
    this.showEdit();
    this.router.navigateByUrl('tabs/tab1');



  }

  

}

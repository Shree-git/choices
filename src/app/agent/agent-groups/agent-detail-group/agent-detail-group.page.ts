import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Group } from '../../../models/group.interface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agent-detail-group',
  templateUrl: './agent-detail-group.page.html',
  styleUrls: ['./agent-detail-group.page.scss'],
})
export class AgentDetailGroupPage implements OnInit {
  public group: Observable<Group>;
  public groupId;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const groupI = this.route.snapshot.paramMap.get('id');
    this.groupId = groupI;
    this.group = this.fservice.getDetail("groups",this.groupId).valueChanges();
  }

  async deleteGroup(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this Group?',
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
          this.fservice.delete("groups", this.groupId);
          this.router.navigateByUrl('agent-tabs/agent-tab2');
        },
      },
    ],
    });

    (await alert).present();
  }

}

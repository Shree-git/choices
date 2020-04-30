import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {AgentDetailMembersPage } from './members-detail-agent.page';

describe('AgentDetailMembersPage', () => {
  let component: AgentDetailMembersPage;
  let fixture: ComponentFixture<AgentDetailMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDetailMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentDetailMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

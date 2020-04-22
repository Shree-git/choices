import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {AgentDetailGroupPage } from './agent-detail-group.page';

describe('AgentDetailGroupPage', () => {
  let component: AgentDetailGroupPage;
  let fixture: ComponentFixture<AgentDetailGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDetailGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentDetailGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

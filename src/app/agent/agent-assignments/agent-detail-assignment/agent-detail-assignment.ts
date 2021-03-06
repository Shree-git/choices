import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentDetailAssignmentPage } from './agent-detail-assignment.page';

describe('AgentDetailAssignmentPage', () => {
  let component: AgentDetailAssignmentPage;
  let fixture: ComponentFixture<AgentDetailAssignmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDetailAssignmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentDetailAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});  

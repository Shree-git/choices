import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentCreateGroupPage } from './agent-create-group.page';

describe('AgentCreateGroupPage', () => {
  let component: AgentCreateGroupPage;
  let fixture: ComponentFixture<AgentCreateGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCreateGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentCreateGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

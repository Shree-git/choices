import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentTab3Page } from './agent-tab3.page';

describe('AgentTab3Page', () => {
  let component: AgentTab3Page;
  let fixture: ComponentFixture<AgentTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTab3Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentTab2Page } from './agent-tab2.page';

describe('AgentTab2Page', () => {
  let component: AgentTab2Page;
  let fixture: ComponentFixture<AgentTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTab2Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentTab1Page } from './agent-tab1.page';

describe('AgentTab1Page', () => {
  let component: AgentTab1Page;
  let fixture: ComponentFixture<AgentTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTab1Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 
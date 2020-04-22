import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTabsPage } from './agent-tabs.page';

describe('AgentTabsPage', () => {
  let component: AgentTabsPage;
  let fixture: ComponentFixture<AgentTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

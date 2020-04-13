import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaTabsPage } from './ca-tabs.page';

describe('CaTabsPage', () => {
  let component: CaTabsPage;
  let fixture: ComponentFixture<CaTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaTabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

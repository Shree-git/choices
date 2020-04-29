import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {DetailAssignmentsPage } from './detail-assignments.page';

describe('DetailAssignmentsPage', () => {
  let component:DetailAssignmentsPage;
  let fixture: ComponentFixture<DetailAssignmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAssignmentsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

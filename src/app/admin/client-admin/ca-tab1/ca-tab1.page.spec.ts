import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaTab1Page } from './ca-tab1.page';

describe('CaTab1Page', () => {
  let component: CaTab1Page;
  let fixture: ComponentFixture<CaTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaTab1Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

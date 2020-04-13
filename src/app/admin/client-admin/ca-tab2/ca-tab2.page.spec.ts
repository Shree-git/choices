import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaTab2Page } from './ca-tab2.page';

describe('CaTab2Page', () => {
  let component: CaTab2Page;
  let fixture: ComponentFixture<CaTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaTab2Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

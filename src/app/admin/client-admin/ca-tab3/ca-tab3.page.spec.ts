import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaTab3Page } from './ca-tab3.page';

describe('CaTab3Page', () => {
  let component: CaTab3Page;
  let fixture: ComponentFixture<CaTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaTab3Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaDetailPage } from './ca-detail.page';

describe('CaDetailPage', () => {
  let component: CaDetailPage;
  let fixture: ComponentFixture<CaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

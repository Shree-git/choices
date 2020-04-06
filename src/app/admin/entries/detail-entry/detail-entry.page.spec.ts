import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEntryPage } from './detail-entry.page';

describe('DetailEntryPage', () => {
  let component: DetailEntryPage;
  let fixture: ComponentFixture<DetailEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorPlanPage } from './vendor-plan.page';

describe('VendorPlanPage', () => {
  let component: VendorPlanPage;
  let fixture: ComponentFixture<VendorPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

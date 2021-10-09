import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorAdminPage } from './vendor-admin.page';

describe('VendorAdminPage', () => {
  let component: VendorAdminPage;
  let fixture: ComponentFixture<VendorAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

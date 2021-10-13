import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MethodShippingPage } from './method-shipping.page';

describe('MethodShippingPage', () => {
  let component: MethodShippingPage;
  let fixture: ComponentFixture<MethodShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodShippingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MethodShippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

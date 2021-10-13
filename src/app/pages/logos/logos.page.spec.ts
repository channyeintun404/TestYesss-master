import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogosPage } from './logos.page';

describe('LogosPage', () => {
  let component: LogosPage;
  let fixture: ComponentFixture<LogosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

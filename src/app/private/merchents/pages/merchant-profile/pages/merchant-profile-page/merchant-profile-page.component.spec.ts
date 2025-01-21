import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProfilePageComponent } from './merchant-profile-page.component';

describe('MerchantProfilePageComponent', () => {
  let component: MerchantProfilePageComponent;
  let fixture: ComponentFixture<MerchantProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

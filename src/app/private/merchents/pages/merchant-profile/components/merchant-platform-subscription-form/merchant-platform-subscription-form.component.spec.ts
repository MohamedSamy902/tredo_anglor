import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPlatformSubscriptionFormComponent } from './merchant-platform-subscription-form.component';

describe('MerchantPlatformSubscriptionFormComponent', () => {
  let component: MerchantPlatformSubscriptionFormComponent;
  let fixture: ComponentFixture<MerchantPlatformSubscriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPlatformSubscriptionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPlatformSubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

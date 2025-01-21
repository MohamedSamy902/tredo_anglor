import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMerchantProfileComponent } from './admin-merchant-profile.component';

describe('AdminMerchantProfileComponent', () => {
  let component: AdminMerchantProfileComponent;
  let fixture: ComponentFixture<AdminMerchantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMerchantProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMerchantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

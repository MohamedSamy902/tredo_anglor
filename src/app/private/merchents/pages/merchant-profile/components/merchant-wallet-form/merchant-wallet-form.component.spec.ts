import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantWalletFormComponent } from './merchant-wallet-form.component';

describe('MerchantWalletFormComponent', () => {
  let component: MerchantWalletFormComponent;
  let fixture: ComponentFixture<MerchantWalletFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantWalletFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantWalletFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProfileDataComponent } from './merchant-profile-data.component';

describe('MerchantProfileDataComponent', () => {
  let component: MerchantProfileDataComponent;
  let fixture: ComponentFixture<MerchantProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantProfileDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBasicInfoFormComponent } from './merchant-basic-info-form.component';

describe('MerchantBasicInfoFormComponent', () => {
  let component: MerchantBasicInfoFormComponent;
  let fixture: ComponentFixture<MerchantBasicInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantBasicInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantBasicInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

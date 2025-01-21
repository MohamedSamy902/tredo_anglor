import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantInfoFormContainerComponent } from './merchant-info-form-container.component';

describe('MerchantInfoFormContainerComponent', () => {
  let component: MerchantInfoFormContainerComponent;
  let fixture: ComponentFixture<MerchantInfoFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantInfoFormContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantInfoFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

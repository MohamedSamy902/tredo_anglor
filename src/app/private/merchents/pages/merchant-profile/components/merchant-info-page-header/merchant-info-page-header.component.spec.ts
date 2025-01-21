import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantInfoPageHeaderComponent } from './merchant-info-page-header.component';

describe('MerchantInfoPageHeaderComponent', () => {
  let component: MerchantInfoPageHeaderComponent;
  let fixture: ComponentFixture<MerchantInfoPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantInfoPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantInfoPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

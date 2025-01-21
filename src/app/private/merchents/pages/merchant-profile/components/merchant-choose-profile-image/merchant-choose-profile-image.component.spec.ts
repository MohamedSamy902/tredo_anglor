import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantChooseProfileImageComponent } from './merchant-choose-profile-image.component';

describe('MerchantChooseProfileImageComponent', () => {
  let component: MerchantChooseProfileImageComponent;
  let fixture: ComponentFixture<MerchantChooseProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantChooseProfileImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantChooseProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

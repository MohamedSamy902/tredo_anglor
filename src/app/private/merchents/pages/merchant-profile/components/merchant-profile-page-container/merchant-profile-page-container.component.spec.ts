import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProfilePageContainerComponent } from './merchant-profile-page-container.component';

describe('MerchantProfilePageContainerComponent', () => {
  let component: MerchantProfilePageContainerComponent;
  let fixture: ComponentFixture<MerchantProfilePageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantProfilePageContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantProfilePageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

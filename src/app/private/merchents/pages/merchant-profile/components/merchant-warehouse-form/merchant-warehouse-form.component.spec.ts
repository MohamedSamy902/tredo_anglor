import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantWarehouseFormComponent } from './merchant-warehouse-form.component';

describe('MerchantWarehouseFormComponent', () => {
  let component: MerchantWarehouseFormComponent;
  let fixture: ComponentFixture<MerchantWarehouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantWarehouseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantWarehouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

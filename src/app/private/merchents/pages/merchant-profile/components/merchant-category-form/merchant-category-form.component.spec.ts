import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCategoryFormComponent } from './merchant-category-form.component';

describe('MerchantCategoryFormComponent', () => {
  let component: MerchantCategoryFormComponent;
  let fixture: ComponentFixture<MerchantCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

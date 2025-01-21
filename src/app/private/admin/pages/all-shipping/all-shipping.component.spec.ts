import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShippingComponent } from './all-shipping.component';

describe('AllShippingComponent', () => {
  let component: AllShippingComponent;
  let fixture: ComponentFixture<AllShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

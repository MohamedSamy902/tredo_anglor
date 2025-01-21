import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialreportsComponent } from './financialreports.component';

describe('FinancialreportsComponent', () => {
  let component: FinancialreportsComponent;
  let fixture: ComponentFixture<FinancialreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

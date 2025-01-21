import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelOrderComponent } from './excel-order.component';

describe('ExcelOrderComponent', () => {
  let component: ExcelOrderComponent;
  let fixture: ComponentFixture<ExcelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

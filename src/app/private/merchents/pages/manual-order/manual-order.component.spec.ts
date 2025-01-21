import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualOrderComponent } from './manual-order.component';

describe('ManualOrderComponent', () => {
  let component: ManualOrderComponent;
  let fixture: ComponentFixture<ManualOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

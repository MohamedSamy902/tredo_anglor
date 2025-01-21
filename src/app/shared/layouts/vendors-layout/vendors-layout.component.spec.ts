import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsLayoutComponent } from './vendors-layout.component';

describe('VendorsLayoutComponent', () => {
  let component: VendorsLayoutComponent;
  let fixture: ComponentFixture<VendorsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

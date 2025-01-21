import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchentsLayoutComponent } from './merchents-layout.component';

describe('MerchentsLayoutComponent', () => {
  let component: MerchentsLayoutComponent;
  let fixture: ComponentFixture<MerchentsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchentsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

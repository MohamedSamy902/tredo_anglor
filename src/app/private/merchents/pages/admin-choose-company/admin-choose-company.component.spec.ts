import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChooseCompanyComponent } from './admin-choose-company.component';

describe('AdminChooseCompanyComponent', () => {
  let component: AdminChooseCompanyComponent;
  let fixture: ComponentFixture<AdminChooseCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChooseCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChooseCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedorComponent } from './vedor.component';

describe('VedorComponent', () => {
  let component: VedorComponent;
  let fixture: ComponentFixture<VedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

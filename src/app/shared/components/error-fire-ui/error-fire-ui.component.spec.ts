import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorFireUiComponent } from './error-fire-ui.component';

describe('ErrorFireUiComponent', () => {
  let component: ErrorFireUiComponent;
  let fixture: ComponentFixture<ErrorFireUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorFireUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFireUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExcelComponent } from './file-excel.component';

describe('FileExcelComponent', () => {
  let component: FileExcelComponent;
  let fixture: ComponentFixture<FileExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

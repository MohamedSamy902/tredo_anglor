import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel-order',
  templateUrl: './excel-order.component.html',
  styleUrls: ['./excel-order.component.scss'],
})
export class ExcelOrderComponent implements OnInit {
  ExcelDate: any = [];
  myArray: any;
  constructor(private route: Router) { }

  ngOnInit(): void { }

  go() {
    this.route.navigate(['/merchents/FileExcel']);
  }
  fileUpload(e: any) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (event: any) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.ExcelDate = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { defval: "" });
      console.log(this.ExcelDate);
      this.myArray = this.ExcelDate;
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-choose-company',
  templateUrl: './admin-choose-company.component.html',
  styleUrls: ['./admin-choose-company.component.scss']
})

export class AdminChooseCompanyComponent implements OnInit {
  firstform: boolean = true;
  secondform: boolean = false;
  thirdform: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showForm() {
    this.firstform = true;
    this.secondform = false;
    this.thirdform = false;
  }
  showForm2() {
    this.firstform = false;
    this.secondform = true;
    this.thirdform = false
  }
  showForm3() {
    this.firstform = false;
    this.secondform = false;
    this.thirdform = true;
  }
}

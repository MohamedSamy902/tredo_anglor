import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  products = [
    { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10, city:'Cairo', phone:'+20123456789', address:'123 Main St' },
    { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20, city:'Cairo', phone:'+20123456789', address:'123 Main St'},
    { code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 30, city:'Cairo', phone:'+20123456789', address:'123 Main St'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

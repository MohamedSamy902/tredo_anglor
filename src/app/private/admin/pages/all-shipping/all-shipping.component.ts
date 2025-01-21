import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { ShippingService } from 'src/app/core/services/admin/shipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-shipping',
  templateUrl: './all-shipping.component.html',
  styleUrls: ['./all-shipping.component.scss']
})
export class AllShippingComponent implements OnInit {
  showTable = false;
  shipping: any
  searchValue: string;
  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 10;
  shippingArray: any[] = [];
  constructor(
    private resolve: ActivatedRoute,
    private shippingService: ShippingService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.resolve.data.subscribe((res) => {
      this.shipping = res['Shipping'];
      this.shippingArray = this.shipping.slice(this.from, this.to);
      this.pageNumbers = Math.ceil(this.shipping.length / 10);
      for (let index = 0; index < this.pageNumbers; index++) {
        this.pages.push(index);
      }
    });
  }


  pagination(type: string, pageNumber: number) {
    if (type === "increase" && this.to <= this.shipping.length) {
      this.from += 10;
      this.to += 10;
      this.pageNumber = pageNumber;
    } else if (type === "decrease" && this.to !== 10) {
      this.from -= 10;
      this.to -= 10;
      this.pageNumber = pageNumber;
    } else if (type === "page" && pageNumber) {
      this.from = 0;
      this.from = 10;
      this.from = (10 * pageNumber) - 10;
      this.to = pageNumber * 10;
      this.pageNumber = pageNumber;
    }
    this.shippingArray = this.shipping.slice(this.from, this.to)
  }

  delete(id: string) {
    Swal.fire({
      title: `${this.translate.instant("AreYouSureYouWantDelete")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translate.instant("Yes,DeleteIt!")}`,
      cancelButtonText: `${this.translate.instant("Cancel")}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shippingService.deleteShippingById(id).subscribe(res => {
          this.shippingArray = this.shippingArray.filter(res => res.id != id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.translate.instant("DeletedSuccessfully")}`,
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    })
  }

}

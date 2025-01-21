import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShippingCompanyStatus } from 'src/app/core/models/Shared/ShipmentEnums';
import { MerchantService } from 'src/app/core/services/admin/merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllMerchantComponent implements OnInit {
  Merchants: any;
  searchValue: string;
  public shippingCompanyStatus = ShippingCompanyStatus
  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 10;
  MerchantsArray: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private MerchantService: MerchantService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllMerchant()
  }

  getAllMerchant() {
    this.route.data.subscribe(res => {
      this.Merchants = res['Merchant']
      this.MerchantsArray = this.Merchants.slice(this.from, this.to);
      this.pageNumbers = Math.ceil(this.Merchants.length / 10);
      for (let index = 0; index < this.pageNumbers; index++) {
        this.pages.push(index);
      }
    })
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
        this.MerchantService.deleteMerchanById(id).subscribe(res => {
          this.MerchantsArray = this.MerchantsArray.filter(res => res.id != id);
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

  pagination(type: string, pageNumber: number) {
    if (type === "increase" && this.to <= this.Merchants.length) {
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
    this.MerchantsArray = this.Merchants.slice(this.from, this.to)
  }

}

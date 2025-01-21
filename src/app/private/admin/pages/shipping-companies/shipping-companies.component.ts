import { Observable } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorInfo } from 'src/app/core/models/VendorInfo';
import { ShippingCompanyStatus } from 'src/app/core/models/Shared/ShipmentEnums';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Role } from 'src/app/core/Enums/Role';

@Component({
  selector: 'app-shipping-companies',
  templateUrl: './shipping-companies.component.html',
  styleUrls: ['./shipping-companies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShippingCompaniesComponent implements OnInit {
  CanDelete:boolean=false
  CanEdit:boolean=false
  CanAdd:boolean=false

  showTable = false;
  companies: VendorInfo[] = []
  searchValue: string;
  public shippingCompanyStatus = ShippingCompanyStatus
  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 10;
  vendors: any[] = [];
  constructor(
    private adminService: AdminService,
    private resolve: ActivatedRoute,
    private translate: TranslateService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.CanDelete=this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.DeleteShippingCompany)||this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.SystemAdministrator)
    this.CanEdit=this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.UpdateShippingCompany)||this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.SystemAdministrator)
    this.CanAdd=this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.AddShippingCompany)||this.authService.GetRoles().map(a=>a.user_RolesId).includes(Role.SystemAdministrator)

    this.resolve.data.subscribe((res) => {
      this.companies = res['Vendors'];
      this.vendors = this.companies.slice(this.from, this.to);
      this.pageNumbers = Math.ceil(this.companies.length / 10);
      for (let index = 0; index < this.pageNumbers; index++) {
        this.pages.push(index);
      }
    });
  }


  pagination(type: string, pageNumber: number) {
    if (type === "increase" && this.to <= this.companies.length) {
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
    this.vendors = this.companies.slice(this.from, this.to)
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
      this.adminService.deleteVendorById(id).subscribe(res => {
        this.vendors = this.vendors.filter(res => res.id != id)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translate.instant("DeletedSuccessfully")}`,
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }

}

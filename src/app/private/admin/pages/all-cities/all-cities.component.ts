import { AdminService } from './../../../../core/services/admin/admin.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllCitiesComponent implements OnInit {
  showTable = false;
  cities = [];
  searchValue: string;
  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 10;
  cityArray: any[] = [];
  constructor(
    private AdminService: AdminService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.route.data.subscribe(res => {
      this.cities = res['Cities'];
      this.cityArray = this.cities.slice(this.from, this.to);
      this.pageNumbers = Math.ceil(this.cities.length / 10);
      for (let index = 0; index < this.pageNumbers; index++) {
        this.pages.push(index);
      }
    })
  }

  delete(id) {
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
        this.AdminService.deleteCity(id).subscribe(res => {
          this.cityArray = this.cityArray.filter(res => res.id != id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.translate.instant("DeletedSuccessfully")}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    })
  }

  pagination(type: string, pageNumber: number) {
    if (type === "increase" && this.to <= this.cities.length) {
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
    this.cityArray = this.cities.slice(this.from, this.to);
  }

}

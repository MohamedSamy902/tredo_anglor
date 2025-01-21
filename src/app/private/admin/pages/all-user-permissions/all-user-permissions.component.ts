import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AdminBusinessService } from '../../services/admin-business.service';
@Component({
  selector: 'app-all-user-permissions',
  templateUrl: './all-user-permissions.component.html',
  styleUrls: ['./all-user-permissions.component.scss']
})
export class AllUserPermissionsComponent implements OnInit {
  Users: any[]
  UsersArray: any[] = []
  searchValue: string;

  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 10;
  constructor(private adminService: AdminBusinessService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  delete(id: string) {
    this.adminService.deleteUserById(id).subscribe(res => {
      this.UsersArray = this.UsersArray.filter(res => res.id != id)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${this.translate.instant("DeletedSuccessfully")}`,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
  getAllUsers() {
    this.adminService.GetAllUsers().subscribe(Result => {
      this.Users = Result.users;
      if (this.Users && this.Users.length > 0) {
        this.UsersArray = this.Users?.slice(this.from, this.to);
        this.pageNumbers = Math.ceil(this.Users.length / 10);
        for (let index = 0; index < this.pageNumbers; index++) {
          this.pages.push(index);
        }
      }
    });
  }

  pagination(type: string, pageNumber: number) {
    if (type === "increase" && this.to <= this.Users.length) {
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
    this.UsersArray = this.Users.slice(this.from, this.to)
  }

  public alertConfirmation = (id) => {
    Swal.fire({
      title: this.translate.instant('Confirm.AreYouSure'),
      text: this.translate.instant('Confirm.DeleteData'),
      icon: 'warning',
      confirmButtonColor: "#DD6B55",
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Confirm.Delete'),
      cancelButtonText: this.translate.instant('Confirm.Cancle')
    }).then((result) => {
      if (result.value) {
        this.delete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

}

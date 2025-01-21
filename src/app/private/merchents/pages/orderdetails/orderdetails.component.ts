import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { ShippingService } from 'src/app/core/services/admin/shipping.service';
import Swal from 'sweetalert2';
import { MerchentsService } from '../../services/merchents.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  orderDetails: any;
  orderId = 0;
  constructor(private route: ActivatedRoute, private shippingService: ShippingService,
    private translate: TranslateService,
    private merchentsService:MerchentsService) {
    this.route.params.subscribe(res => {
      if (res['id']){
        this.getOrderById(res['id']);
        this.orderId =  res['id'];
      }

    });
  }

  ngOnInit(): void { }

  getOrderById(id: string) {
    this.shippingService.getOrderById(id).subscribe(res => {
      this.orderDetails = res;
    });
  }

  CancelOrderId(id) {
    this.merchentsService.CancelOrder(id).subscribe(res => {
      this.orderDetails = res;
    });
  }
  delete() {
    Swal.fire({
      title: `${this.translate.instant("AreYouSureYouWantDelete")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `${this.translate.instant("Yes,DeleteIt!")}`,
      cancelButtonText: `${this.translate.instant("Cancel")}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.merchentsService.CancelOrder(this.orderId).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${this.translate.instant("DeletedSuccessfully")}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.getOrderById(this.orderId.toString());
          this.merchentsService.getCuurentMerchantInfo(this.userInfo?.merchentId)
        });
      }
    })
  }
  private get userInfo() {
    return JSON.parse(localStorage.getItem('logUserInfo')!);
  }
  track(){


    this.merchentsService.TrackOrderWithAction(this.orderId).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${this.translate.instant("TrackOrderWithActionResult")}`,
        html:'     <p class="text-bold">'+ this.translate.instant( 'ordersStatus.'+res)+'</p>',
        showConfirmButton: false,
        timer: 10000,
        willClose: () => {

          this.getOrderById(this.orderId.toString());
        }
      });
    });
  }
}

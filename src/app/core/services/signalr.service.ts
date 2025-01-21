import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SignalrService implements OnInit {
  private _hubConnection: HubConnection;

  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router) {}
  ngOnInit(): void {
    this.connect();
  }

  private connect(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://api.tredo.biz/MessageHub')
      .withAutomaticReconnect()
      .build();

      let userInfo =   JSON.parse(localStorage.getItem('logUserInfo')!);

    this._hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));


    this._hubConnection.on('SendOffersToUser', (message) => {
      this.toastr.success(message);
     });
    this._hubConnection.on('SendOrderToUser', (message) => {


      if(userInfo.merchentId  == message.merchantsInfoId){
         Swal.fire({
        icon: 'success',
        title:'لديك طلب من منصة سلة',
        confirmButtonText: 'معاينة الطلب',
        willClose: () => { this.router.navigate(['merchents/manual-order',{ sallaorder: JSON.stringify(message)}]) }
      });
      }


    });

  }
}

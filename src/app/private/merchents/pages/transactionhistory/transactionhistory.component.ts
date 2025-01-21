import { Component, OnInit } from '@angular/core';
import { MerchentsService } from '../../services/merchents.service';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.scss']
})
export class TransactionhistoryComponent implements OnInit {

  public transactionsSummary: any;
  public transactionsLoading: boolean;

  constructor(private _MerchentsService: MerchentsService) {
    this.getMerchantWalletDetails();
  }

  ngOnInit(): void {
  }

  get userInfo() {
    return JSON.parse(localStorage.getItem('logUserInfo')!);
  }

  private getMerchantWalletDetails() {
    this.transactionsLoading = true;
    this._MerchentsService.getMerchantWalletDetails(this.userInfo?.merchentId).subscribe(
      (res: any) => {
        this.transactionsLoading = false;
        this.transactionsSummary = res;
      },
      (err: any) => {
        this.transactionsLoading = false;
      });
  }
}

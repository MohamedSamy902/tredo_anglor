import { environment } from './../../../../environments/environment.prod';
import { Router } from '@angular/router';
import { I18nService } from './../../i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { MessageService } from 'primeng/api';
import { SharingDataAppService } from 'src/app/core/services/SharingDataApp.service';
import { merchantsInfo } from 'src/app/core/models/MerchantsInfo';
declare var Moyasar;
declare var window: any; // Needed on Angular 8+
const parsedUrl = new URL(window.location.href);
const baseUrl = parsedUrl.origin;

@Component({
  selector: 'app-merchents-layout',
  templateUrl: './merchents-layout.component.html',
  styleUrls: ['./merchents-layout.component.scss'],
  providers: [MessageService]
})
export class MerchentsLayoutComponent implements OnInit, AfterViewInit {
  localLang = localStorage.getItem('tredoLang');
  amount: number = 10;
  paymentToken: string;
  isLoading: boolean;
  merchant: any;
  locale;
  user;
  constructor(
    private paymentService: PaymentService,
    private translate: TranslateService,
    private i18nService: I18nService,
    private router: Router,
    private authService: AuthService,
    private SDA:SharingDataAppService
  ) {
    translate.setDefaultLang('ar');
    translate.use('ar');
  }
  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe((locale) => {
      this.locale = locale;
      this.translate.use(locale);
    });
    if (this.authService.IsLoggedIn()) {
      this.user = this.authService.GetLoginUser().userName;
    }
    this.SDA.MerchantMeta$.subscribe(usermeta => {
      this.merchant = usermeta as merchantsInfo;
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.merchant = JSON.parse(localStorage.getItem('merchantInfo')!);
      this.authService.merchantData$.subscribe({
        next: (res: any) => {
          this.SDA.SetUserMetaData(res as merchantsInfo);
          this.merchant = res as merchantsInfo;
        },
        error: () => { },
        complete: () => { },
      });
    }, 0);
  }
  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);
    localStorage.setItem('tredoLang', locale);
  }
  chargeWallet() {
    /**
     * @TODO localhost will be replaced with the domain
     */
    if (!this.isLoading) {
      this.isLoading = true;
      this.paymentService
        .createTransAction(
          this.amount,
          'description',
          null,
          JSON.parse(localStorage.getItem('logUserInfo')!).merchentId
        )
        .subscribe({
          next: (res: { token: string }) => {
            this.paymentToken = res.token;
            this.isLoading = false;
            Moyasar.init({
              element: '.mysr-form',
              amount: this.amount * 100,
              language: 'ar',
              currency: 'SAR',
              description: 'Tredo charge',
              publishable_api_key:   environment.moyser.publishable_live_api_key,
              callback_url: `${baseUrl}/merchents?token=${this.paymentToken}`,
              methods: ['creditcard'],
            });
          },
          error: () => {
            this.paymentToken = '';
            this.isLoading = false;
          },
        });
    }
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}

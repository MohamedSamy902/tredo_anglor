import { I18nService } from './shared/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { AuthService } from './core/authentication/auth.service';
import { SignalrService } from './core/services/signalr.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tredo';
  dir;
  en = false;
  url = 'https://jsonplaceholder.typicode.com/users';
  users: string[] = [];
  constructor(
    private translate: I18nService,
    private tran: TranslateService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private view: ViewportScroller,
    private authService: AuthService,
    private singalR: SignalrService
  ) {
    this.singalR.ngOnInit();
    tran.addLangs(["en", "ar"]);
    tran.setDefaultLang('ar');
    tran.use('ar');
    translate.changeLocale('ar');
    translate.localeEvent.subscribe((loc) => {
      if (loc == 'en') {
        this.dir = 'ltr';
        this.en = true;
        tran.setDefaultLang('en');
      } else {
        this.dir = 'rtl';
        this.en = false;
        tran.setDefaultLang('ar');

      }
    });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const body = document.getElementById('bodyId');
        body?.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('logUserInfo')!);
    if (user.merchentId) {
      this.authService.getMerchantData(user.merchentId).subscribe((res) => {
        localStorage.setItem('merchantInfo', JSON.stringify(res));
      });
    }
  }
}

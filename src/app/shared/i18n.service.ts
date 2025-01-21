import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  localLang = localStorage.getItem('tredoLang') || '';
  localeEvent = new BehaviorSubject<string>(this.localLang);

  constructor(private translate: TranslateService) {
    this.changeLocale('ar');
  }

  changeLocale(locale: string){
    this.translate.use(locale);
    this.localeEvent.next(locale);
  }
}

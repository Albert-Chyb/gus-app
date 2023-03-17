import { registerLocaleData } from '@angular/common';
import PL_LOCALE_DATA_EXTRA from '@angular/common/locales/extra/pl';
import PL_LOCALE_DATA from '@angular/common/locales/pl';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

@NgModule({
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'PLN',
    },
  ],
})
export class LocaleModule {
  constructor() {
    registerLocaleData(PL_LOCALE_DATA, 'pl', PL_LOCALE_DATA_EXTRA);
  }
}

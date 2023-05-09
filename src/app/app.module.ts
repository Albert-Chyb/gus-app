import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInitializer } from './initializers/auth.initializer';
import { SidInterceptor } from './interceptors/sid.interceptor';
import { LocaleModule } from './locale.module';
import { MatModule } from './mat.module';
import { GusInterceptor } from './interceptors/gus.interceptor';
import { SearchCompaniesComponent } from './pages/search-companies/search-companies.component';

@NgModule({
  declarations: [AppComponent, SearchCompaniesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    LocaleModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SidInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: GusInterceptor,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AuthService],
      useFactory: (auth: AuthService) => authInitializer(auth),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

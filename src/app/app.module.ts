import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { GenericValidatorDirective } from './directives/generic-validator.directive';
import { authInitializer } from './initializers/auth.initializer';
import { GusInterceptor } from './interceptors/gus.interceptor';
import { SidInterceptor } from './interceptors/sid.interceptor';
import { LocaleModule } from './locale.module';
import { MatModule } from './mat.module';
import { AuthStateComponent } from './pages/auth-state/auth-state.component';
import { CompanyComponent } from './pages/company/company.component';
import { SearchCompaniesComponent } from './pages/search-companies/search-companies.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCompaniesComponent,
    MainContainerComponent,
    CompanyComponent,
    ErrorCardComponent,
    GenericValidatorDirective,
    AuthStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    LocaleModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,
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
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

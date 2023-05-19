import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthStateComponent } from './pages/auth-state/auth-state.component';
import { CompanyComponent } from './pages/company/company.component';
import { SearchCompaniesComponent } from './pages/search-companies/search-companies.component';

const routes: Routes = [
  {
    path: '',
    component: SearchCompaniesComponent,
    canActivate: [AuthGuard(['auth-state'])],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard(['auth-state'])],
  },
  { path: 'auth-state', component: AuthStateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

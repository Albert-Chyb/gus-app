import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { SearchCompaniesComponent } from './pages/search-companies/search-companies.component';

const routes: Routes = [
  { path: '', component: SearchCompaniesComponent },
  { path: 'company', component: CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

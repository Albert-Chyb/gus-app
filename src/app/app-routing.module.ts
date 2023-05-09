import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCompaniesComponent } from './pages/search-companies/search-companies.component';

const routes: Routes = [{ path: '', component: SearchCompaniesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

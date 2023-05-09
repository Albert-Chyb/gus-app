import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SearchCompaniesService } from './services/search-companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private readonly searchCompanies: SearchCompaniesService,
    private readonly auth: AuthService
  ) {}

  test() {
    // this.searchCompanies.byNIP('5213003700').subscribe(console.log);
    this.searchCompanies.byREGON('000001407').subscribe(console.log);
    // this.searchCompanies.byKRS('0000030211').subscribe(console.log);
  }

  logout() {
    this.auth.logout();
  }
}

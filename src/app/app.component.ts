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
    const nip = '6570009774';

    this.searchCompanies.byNIP(nip).then(console.log);
  }

  logout() {
    this.auth.logout();
  }
}

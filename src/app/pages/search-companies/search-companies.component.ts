import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css'],
})
export class SearchCompaniesComponent {
  nip = '';
  regon = '';
  krs = '';

  constructor(private readonly router: Router) {}

  runSearch(
    queryParams: { nip: string } | { regon: string } | { krs: string }
  ) {
    const routerLink = 'company';

    return this.router.navigate([routerLink], { queryParams });
  }
}

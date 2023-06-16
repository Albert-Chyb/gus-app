import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NIPValidator } from 'src/app/validators/nip';
import { REGONValidator } from 'src/app/validators/regon';

@Component({
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css'],
})
export class SearchCompaniesComponent {
  nip = '';
  regon = '';
  krs = '';

  validators = {
    nip: [NIPValidator],
    regon: [REGONValidator],
  };

  nipMask = {

  }

  constructor(private readonly router: Router) {}

  runSearch(
    queryParams: { nip: string } | { regon: string } | { krs: string }
  ) {
    const routerLink = 'company';

    return this.router.navigate([routerLink], { queryParams });
  }
}

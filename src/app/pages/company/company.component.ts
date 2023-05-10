import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from 'src/app/classes/company';
import { SearchCompaniesService } from 'src/app/services/search-companies.service';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchCompanies: SearchCompaniesService
  ) {}

  company$!: Observable<Company>;
  displayedColumns: string[] = ['key', 'value'];

  ngOnInit(): void {
    this.company$ = this.search();
  }

  search(): Observable<Company> {
    let searchTask: Observable<Company>;

    if (this.activatedRoute.snapshot.queryParamMap.has('nip')) {
      searchTask = this.searchCompanies.byNIP(
        this.activatedRoute.snapshot.queryParamMap.get('nip')!
      );
    } else if (this.activatedRoute.snapshot.queryParamMap.has('regon')) {
      searchTask = this.searchCompanies.byREGON(
        this.activatedRoute.snapshot.queryParamMap.get('regon')!
      );
    } else if (this.activatedRoute.snapshot.queryParamMap.has('krs')) {
      searchTask = this.searchCompanies.byKRS(
        this.activatedRoute.snapshot.queryParamMap.get('krs')!
      );
    } else {
      throw new Error('No query params');
    }

    return searchTask;
  }

  translateKeysForDisplay(company: Company): [string, string][] {
    const translations: any = {
      regon: 'REGON',
      nip: 'NIP',
      statusNip: 'Status NIP',
      nazwa: 'Nazwa',
      wojewodztwo: 'Województwo',
      powiat: 'Powiat',
      gmina: 'Gmina',
      miejscowosc: 'Miejscowość',
      kodPocztowy: 'Kod pocztowy',
      ulica: 'Ulica',
      nrNieruchomosci: 'Nr nieruchomości',
      nrLokalu: 'Nr lokalu',
      typ: 'Nazwa podstawowej formy prawnej',
      silosID: 'Silos',
      dataZakonczeniaDzialalnosci: 'Data zakończenia działalności',
      miejscowoscPoczty: 'Miejscowość poczty',
    };

    return Object.entries(company).map(([key, value]) => {
      if(key === 'silosID') {
        value = company.getSilosIDDescription();
      } else if(key === 'typ') {
        value = company.getTypeDescription();
      }

      return [translations[key], value];
    });
  }
}

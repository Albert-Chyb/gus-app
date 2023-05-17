import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Company } from 'src/app/classes/company';
import { GusError } from 'src/app/classes/gus-error';
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

  companies$!: Observable<Company[] | null>;
  displayedColumns: string[] = ['key', 'value'];
  error: GusError | null = null;

  ngOnInit(): void {
    this.companies$ = this.search();
  }

  search() {
    let searchTask: Observable<Company[]>;

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

    return searchTask.pipe(
      catchError((error: any) => {
        if (GusError.isGusError(error)) {
          this.error = error;

          return of(null);
        }

        return throwError(() => error);
      })
    );
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
      silosID: 'Rodzaj działalności',
      dataZakonczeniaDzialalnosci: 'Data zakończenia działalności',
      miejscowoscPoczty: 'Miejscowość poczty',
    };

    return Object.entries(company)
      .filter(([key]) => key in translations)
      .map(([key, value]) => {
        if (key === 'silosID') {
          value = company.getSilosIDDescription();
        } else if (key === 'typ') {
          value = company.getTypeDescription();
        }

        return [translations[key], value];
      });
  }
}

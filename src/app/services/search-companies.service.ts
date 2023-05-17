import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../classes/company';
import { isNIPValid } from '../validators/nip';
import { isREGONValid } from '../validators/regon';

@Injectable({
  providedIn: 'root',
})
export class SearchCompaniesService {
  constructor(private readonly http: HttpClient) {}

  byNIP(nip: string) {
    if (!isNIPValid(nip)) {
      throw new Error('Invalid NIP');
    }

    return this.createRequest({ nip });
  }

  byREGON(regon: string) {
    if (!isREGONValid(regon)) {
      throw new Error('Invalid REGON');
    }

    return this.createRequest({ regon });
  }

  byKRS(krs: string) {
    if (krs.length !== 10) {
      throw new Error('KRS must be 10 digits long');
    }

    return this.createRequest({ krs });
  }

  private createRequest(queryParams: {
    nip?: string;
    regon?: string;
    krs?: string;
  }) {
    let params;

    if ('nip' in queryParams) {
      params = { 'dat:Nip': queryParams.nip };
    } else if ('regon' in queryParams) {
      params = { 'dat:Regon': queryParams.regon };
    } else if ('krs' in queryParams) {
      params = { 'dat:Krs': queryParams.krs };
    } else {
      throw new Error('No query params provided');
    }

    const headers = new HttpHeaders({
      Action:
        'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty',
    });
    const body = {
      $: {
        'xmlns:ns': 'http://CIS/BIR/PUBL/2014/07',
        'xmlns:dat': 'http://CIS/BIR/PUBL/2014/07/DataContract',
      },
      'ns:DaneSzukajPodmioty': {
        'ns:pParametryWyszukiwania': params,
      },
    };

    return this.http
      .post(environment.apiOrigin, body, {
        headers,
        responseType: 'text',
      })
      .pipe(
        map((res) => JSON.parse(res)),
        map((res) => res.root.dane),
        map((res) =>
          Array.isArray(res)
            ? res.map((c) => new Company(c))
            : [new Company(res)]
        )
      );
  }
}

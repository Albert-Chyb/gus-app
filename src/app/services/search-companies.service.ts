import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchCompaniesService {
  constructor(private readonly http: HttpClient) {}

  async byNIP(nip: string) {
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
        'ns:pParametryWyszukiwania': { 'dat:Nip': nip },
      },
    };
    const res = JSON.parse(
      await firstValueFrom(
        this.http.post(environment.apiOrigin, body, {
          headers,
          responseType: 'text',
        })
      )
    );

    return res.root.dane;
  }
}

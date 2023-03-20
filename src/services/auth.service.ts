import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  async login() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/soap+xml;charset=UTF-8;',
    });
    const soapAction = 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj';
    const body = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
            
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                <wsa:Action>${soapAction}</wsa:Action>
                <wsa:To>${environment.apiOriginProxyFree}</wsa:To>
            </soap:Header>

            <soap:Body>
                <ns:Zaloguj>
                    <ns:pKluczUzytkownika>${environment.apiKey}</ns:pKluczUzytkownika>
                </ns:Zaloguj>
            </soap:Body>
            
        </soap:Envelope>
    `;
    const res = await firstValueFrom(
      this._http.post(environment.apiOrigin, body, {
        headers,
        responseType: 'text',
      })
    );
    const regexMatch = res.match(
      /(?:<ZalogujResult>)(?<sid>.*)(?:<\/ZalogujResult>)/
    );
    const sid: string = (regexMatch as any).groups['sid'];

    localStorage.setItem('sid', sid);
  }

  async logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/soap+xml;charset=UTF-8;',
      sid: this.getSID(),
    });
    const soapAction = 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj';
    const body = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
            
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                <wsa:Action>${soapAction}</wsa:Action>
                <wsa:To>${environment.apiOriginProxyFree}</wsa:To>
            </soap:Header>

            <soap:Body>
                <ns:Wyloguj>
                    <ns:pIdentyfikatorSesji>${this.getSID()}</ns:pIdentyfikatorSesji>
                </ns:Wyloguj>
            </soap:Body>

        </soap:Envelope>
    `;
    const res = await firstValueFrom(
      this._http.post(environment.apiOrigin, body, {
        headers,
        responseType: 'text',
      })
    );
    const regexMatch = res.match(
      /(?:<WylogujResult>)(?<status>.*)(?:<\/WylogujResult>)/
    );

    if ((regexMatch as any)?.groups.status === 'true') {
      localStorage.removeItem('sid');
    }
  }

  getSID(): string {
    return localStorage.getItem('sid') ?? '';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('sid') !== null;
  }

  async isSessionAlive(): Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/soap+xml;charset=UTF-8;',
      sid: this.getSID(),
    });
    const action = 'http://CIS/BIR/2014/07/IUslugaBIR/GetValue';
    const body = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/2014/07">
      
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
          <wsa:To>${environment.apiOriginProxyFree}</wsa:To>
          <wsa:Action>${action}</wsa:Action>
        </soap:Header>

        <soap:Body>
          <ns:GetValue>
            <ns:pNazwaParametru>StatusSesji</ns:pNazwaParametru>
          </ns:GetValue>
        </soap:Body>

      </soap:Envelope>
    `;
    const res = await firstValueFrom(
      this._http.post(environment.apiOrigin, body, {
        headers,
        responseType: 'text',
      })
    );
    const regexMatch = res.match(
      /(?:<GetValueResult>)(?<status>.*)(?:<\/GetValueResult>)/
    );
    const status = (regexMatch as any).groups.status;

    return status === '1';
  }
}

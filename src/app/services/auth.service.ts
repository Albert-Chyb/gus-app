import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  private readonly _authChange$ = new BehaviorSubject<string>(this.getSID());

  /**
   * Emits whenever SID changes.
   */
  readonly authChange$ = this._authChange$.asObservable();

  async login() {
    const headers = new HttpHeaders({
      Action: 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj',
    });
    const body = {
      $: {
        'xmlns:ns': 'http://CIS/BIR/PUBL/2014/07',
      },
      'ns:Zaloguj': {
        'ns:pKluczUzytkownika': environment.apiKey,
      },
    };

    const res: any = JSON.parse(
      await firstValueFrom(
        this.http.post(environment.apiOrigin, body, {
          headers,
          responseType: 'text',
        })
      )
    );

    this.storeSID(res);

    return res;
  }

  async logout() {
    const headers = new HttpHeaders({
      Action: 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj',
    });
    const body = {
      $: {
        'xmlns:ns': 'http://CIS/BIR/PUBL/2014/07',
      },
      'ns:Wyloguj': {
        'ns:pIdentyfikatorSesji': this.getSID(),
      },
    };
    const res: any = JSON.parse(
      await firstValueFrom(
        this.http.post(environment.apiOrigin, body, {
          headers,
          responseType: 'text',
        })
      )
    );

    if (res === 'true') {
      this.forgetSID();
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
      Action: 'http://CIS/BIR/2014/07/IUslugaBIR/GetValue',
    });
    const body = {
      $: {
        'xmlns:ns': 'http://CIS/BIR/2014/07',
      },
      'ns:GetValue': {
        'ns:pNazwaParametru': 'StatusSesji',
      },
    };
    const res: any = JSON.parse(
      await firstValueFrom(
        this.http.post(environment.apiOrigin, body, {
          headers,
          responseType: 'text',
        })
      )
    );

    return res === '1';
  }

  private storeSID(sid: string) {
    localStorage.setItem('sid', sid);
    this._authChange$.next(sid);
  }

  private forgetSID() {
    localStorage.removeItem('sid');
    this._authChange$.next('');
  }
}

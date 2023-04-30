import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchCompaniesService {
  constructor(
    private readonly http: HttpClient,
    @Inject(DOCUMENT) private readonly docRef: Document
  ) {}

  async byNIP(nip: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/soap+xml;charset=UTF-8;',
    });
    const soapAction =
      'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty';
    const body = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
            
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                <wsa:Action>${soapAction}</wsa:Action>
                <wsa:To>${environment.apiOriginProxyFree}</wsa:To>
            </soap:Header>

            <soap:Body>
                <ns:DaneSzukajPodmioty>
                  <ns:pParametryWyszukiwania>
                    <dat:Nip>${nip}</dat:Nip>
                  </ns:pParametryWyszukiwania>
                </ns:DaneSzukajPodmioty>
            </soap:Body>
            
        </soap:Envelope>
    `;
    const res = await firstValueFrom(
      this.http.post(environment.apiOrigin, body, {
        headers,
        responseType: 'text',
      })
    );

    const soapEnvelopeRegex = /<s:Envelope[\s\S]*<\/s:Envelope>/;
    const soapEnvelope = soapEnvelopeRegex.exec(res)?.[0] ?? '';
    const decodedEnvelope = this.decodeHtmlEntitiesCodes(soapEnvelope);
    const envelopeParser = new DOMParser();
    const parsedEnvelope = envelopeParser.parseFromString(
      decodedEnvelope,
      'text/xml'
    );
    const payload = Array.from(
      parsedEnvelope.querySelector('DaneSzukajPodmiotyResponse dane')
        ?.children ?? []
    );
    const entries: [string, any][] = [];

    for (const infoEl of payload) {
      entries.push([this.lowerFirstLetter(infoEl.tagName), infoEl.textContent]);
    }

    return Object.fromEntries(entries);
  }

  /** A method that converts HTML entities codes into their values. */
  private decodeHtmlEntitiesCodes(html: string | null): string {
    const textArea = this.docRef.createElement('textarea');
    textArea.innerHTML = html ?? '';

    return textArea.value;
  }

  /** A method that transforms first letter into a lowercase character. */
  private lowerFirstLetter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}

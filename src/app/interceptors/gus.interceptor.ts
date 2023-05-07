import { DOCUMENT } from '@angular/common';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Builder, ParserOptions, parseStringPromise, processors } from 'xml2js';

@Injectable()
export class GusInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private readonly docRef: Document) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    if (request.url === environment.apiOrigin) {
      const envelopeBuilder = new Builder({
        headless: true,
      });
      const envelopeObj = {
        'soap:Envelope': {
          $: {
            'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
          },
          'soap:Header': {
            $: {
              'xmlns:wsa': 'http://www.w3.org/2005/08/addressing',
            },
            'wsa:Action': request.headers.get('Action'),
            'wsa:To': environment.apiOriginProxyFree,
          },
          'soap:Body': request.body,
        },
      };
      const envelope = envelopeBuilder.buildObject(envelopeObj);

      return next
        .handle(
          request.clone({
            body: envelope,
            setHeaders: {
              'Content-Type': 'application/soap+xml;charset=UTF-8;',
            },
          })
        )
        .pipe(
          switchMap((event: HttpEvent<string>) => {
            if (event.type === HttpEventType.Response) {
              const envelope = this.extractSOAPEnvelope(
                this.decodeHtmlEntitiesCodes(event.body)
              );
              const parserOptions: ParserOptions = {
                tagNameProcessors: [
                  processors.stripPrefix,
                  processors.firstCharLowerCase,
                ],
                ignoreAttrs: true,
                explicitArray: false,
              };

              return from(parseStringPromise(envelope, parserOptions)).pipe(
                map((parsedEnvelope) => {
                  const body = this.extractResponseBody(
                    parsedEnvelope,
                    parserOptions
                  );
                  const newResponse = {
                    body: JSON.stringify(body),
                    headers: this.extractResponseHeaders(parsedEnvelope),
                  };

                  return event.clone(newResponse);
                })
              );
            }

            return of(event);
          })
        );
    }

    return next.handle(request);
  }

  private extractResponseHeaders(envelope: any): any {
    return envelope['envelope']['header'];
  }

  private extractResponseBody(
    envelope: any,
    parserOptions: ParserOptions
  ): any {
    const action = envelope['envelope']['header']['action'];
    let actionName = action.split('/').pop().replace('Response', '');

    for (const tagProcesor of parserOptions?.tagNameProcessors ?? []) {
      actionName = tagProcesor(actionName);
    }

    return envelope['envelope']['body'][`${actionName}Response`][
      `${actionName}Result`
    ];
  }

  private extractSOAPEnvelope(text: string) {
    const regex = /<s:Envelope\s+[^>]*>([\s\S]*?)<\/s:Envelope>/;
    const match = text.match(regex);

    return match ? match[0] : '';
  }

  /** A method that converts HTML entities codes into their values. */
  private decodeHtmlEntitiesCodes(html: string | null): string {
    const textArea = this.docRef.createElement('textarea');
    textArea.innerHTML = html ?? '';

    return textArea.value;
  }
}

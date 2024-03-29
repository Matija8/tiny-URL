import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TinyUrlService {
  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: string) {
    return firstValueFrom(
      this.http.post<{ shortUrl: string }>('http://localhost:1212/shortenUrl', {
        longUrl,
      }),
    ); // TODO: get url from env
  }

  async getAnalytics(/* limit */) {
    const res = await firstValueFrom(
      this.http.post<any[]>('http://localhost:1212/getAnalytics', {}),
    ); // TODO: get url from env
    if (!Array.isArray(res)) {
      throw Error();
    }
    return res;
  }

  isUrlValid(urlToTest: string): boolean {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      urlToTest,
    );
  }
}

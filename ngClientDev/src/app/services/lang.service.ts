import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
export class LangService {
  lang: any

  constructor(private http: Http) {}

  getLang(lang) {
    if (lang === 'pl' || lang === 'en') {
      return this.http
        .get(`../../assets/config/langs/${lang}.json`)
        .map(res => res.json())
    } else {
      return this.http
        .get(`../../assets/config/langs/pl.json`)
        .map(res => res.json())
    }
  }
}

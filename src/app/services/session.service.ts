import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private static KEY_LANGUAGE = 'LANGUAGE';

  constructor() {}

  setLanguage(language: string): void {
    localStorage.setItem(SessionService.KEY_LANGUAGE, language);
  }

  getLanguage(): string {
    const s = localStorage.getItem(SessionService.KEY_LANGUAGE);
    if (s === null) return 'en';
    return s;
  }
}

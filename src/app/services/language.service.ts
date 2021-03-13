import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Title } from '@angular/platform-browser';

/**
 * Language service - provides built in strings for UI
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private http: HttpClient,
    private session: SessionService,
    private title: Title
  ) {
    this.languages = { en: {}, cy: {} };
    // load english
    this.load('en')
      .then((r) => {
        this.languages.en = r;
      })
      .catch((e) => {
        console.warn(e);
      });

    // load welsh
    this.load('cy')
      .then((r) => {
        this.languages.cy = r;
        this.setTitle();
      })
      .catch((e) => {
        console.warn(e);
      });

    this.currentLanguage.next(this.session.getLanguage());
  }

  private currentLanguage = new BehaviorSubject<string>('en');
  private languages: { [en: string]: any; cy: any };

  /**
   * Sets the page title
   * @private
   */
  private setTitle(): void {
    this.currentLanguage.asObservable().subscribe((r) => {
      this.title.setTitle(this.getStringFromLanguage('title', r));
    });
  }
  /**
   * Loads a single lanugage and returns the result
   * @param language the language to load
   * @return promise resolving in the language file
   * @private
   */
  private load(language: string): Promise<any> {
    const jsonFile = `assets/strings/${language}.json`; // ${language} could be 'en' or 'cy'

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: any) => {
          resolve(response);
        })
        .catch((response: any) => {
          reject(`Error loading language file for language: "${language}."`);
        });
    });
  }

  /**
   * Gets a single string
   * @param language the language object
   * @param id the ID
   * @private
   * @return the requested string
   */
  private getOne(language: any, id: string): string {
    if (language) {
      if (language[id]) {
        return language[id];
      } else {
        throw new Error(`String ID ${id} not found.`);
      }
    } else {
      throw new Error('language not loaded');
    }
  }

  /**
   * Gets a single string by ID
   * @param id the ID
   * @return the requested string
   */
  get(id: string): string {
    return this.getOne(this.languages[this.currentLanguage.getValue()], id);
  }

  /**
   * Sets the current language
   * @param language the language to set to
   */
  setLanguage(language: string): void {
    this.currentLanguage.next(language);
    this.session.setLanguage(language);
  }

  /**
   * Returns the current language
   */
  getLanguage(): string {
    return this.currentLanguage.getValue();
  }

  /**
   * Gets the current language as an observable for events that trigger on change
   */
  getLanguageObservable(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  /**
   * Gets a string from a particular language
   * @param id the ID of the string
   * @param language the language ID
   */
  getStringFromLanguage(id: string, language: string): string {
    return this.getOne(this.languages[language], id);
  }
}

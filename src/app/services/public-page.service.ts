import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicPageService {
  constructor() {}
}

export class Page {
  title: string;
  path: string;
}

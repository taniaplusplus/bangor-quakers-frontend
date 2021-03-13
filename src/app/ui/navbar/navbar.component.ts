import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'rsf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NavbarComponent implements OnInit {
  constructor(public l: LanguageService) {}

  public pages = [
    'page_home',
    'page_worship',
    'page_about',
    'page_contact',
    'page_news',
  ];

  ngOnInit(): void {}
}

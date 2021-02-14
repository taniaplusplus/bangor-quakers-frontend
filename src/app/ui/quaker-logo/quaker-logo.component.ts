import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'rsf-quaker-logo',
  templateUrl: './quaker-logo.component.html',
  styleUrls: ['./quaker-logo.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class QuakerLogoComponent implements OnInit {
  animated = false;

  constructor(public l: LanguageService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animated = true;
    }, 100);
  }
}

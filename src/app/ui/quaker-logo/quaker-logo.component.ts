import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'rsf-quaker-logo',
  templateUrl: './quaker-logo.component.html',
  styleUrls: ['./quaker-logo.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class QuakerLogoComponent implements OnInit, OnDestroy {
  /**
   * Whether the page load timeout has occurred
   * Animations are blocked for a bit to prevent animations playing right
   * on page load
   */
  animated = false;

  /**
   * Whether the QUAKERS text is animating currently
   */
  animatedText = false;

  /**
   * The current display language, cached because of animations
   */
  language: string;

  private languageSub: Subscription | undefined;

  private intervalCheckSub: Subscription | undefined;

  constructor(public l: LanguageService) {
    this.language = l.getLanguage();
  }

  ngOnInit(): void {
    // Allow animations after 100ms
    setTimeout(() => {
      this.animated = true;
    }, 100);

    // When a language change happens, play the animation
    this.languageSub = this.l.getLanguageObservable().subscribe((language) => {
      this.onNewLanguage(language);
    });

    this.intervalCheckSub = interval(10000).subscribe(() => {
      if (!this.animatedText && this.language !== this.l.getLanguage()) {
        this.language = this.l.getLanguage();
      }
    });
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
    this.intervalCheckSub?.unsubscribe();
  }
  /**
   * On language change, play the animation
   * @param language the language
   * @private
   */
  private onNewLanguage(language: string): void {
    // If an animation is currently playing, wait 1500ms and call this function again
    if (this.animatedText) {
      setTimeout(() => {
        this.onNewLanguage(language);
      }, 1500);

      // otherwise, if the language changed and the animations are enabled, play the animation
    } else if (this.animated && this.language !== language) {
      // start the text animation fadeout
      this.animatedText = true;

      // once the text has faded out, rotate the Q
      setTimeout(() => {
        this.language = language;
      }, 200);

      // disable the text animation after 1000ms
      setTimeout(() => {
        this.animatedText = false;
      }, 1000);
    }
  }
}

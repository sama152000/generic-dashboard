import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang: string = 'en';
  private language = 'en';

  private renderer: Renderer2;
  private currentLanguage = new BehaviorSubject<string>(this.defaultLang);

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initLanguage();
  }

  isEnglish() {
    return true; // Always English
  }

  initLanguage() {
    this.language = this.defaultLang;
    localStorage.setItem('currentLang', this.language);
    this.handleBasicLogic();
  }

  checkLang(): boolean {
    return true; // Always English
  }

  private handleBasicLogic() {
    // Always set to LTR for English
    this.renderer.removeClass(document.body, 'rtl');
    this.renderer.setAttribute(document.body, 'dir', 'ltr');
    this.renderer.setAttribute(document.querySelector("html"), "lang", "en");
    this.currentLanguage.next(this.language);
  }

  // Simple translation method to return English strings
  instant(key: string): string {
    // For now, return the key as is, or you can map to English strings
    return key;
  }
}

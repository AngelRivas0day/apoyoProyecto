import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from  '@angular/common';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if(isPlatformBrowser(this.platformId)){
      const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-171608421-1', {
          page_path: event.urlAfterRedirects
        });
      });
    }
  }
}

import { Component, HostBinding } from '@angular/core';
import { CommonUtility } from '@app-core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { List } from '@app-models';

@Component({
    selector: 'public-root',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss']
})
export class PublicComponent {
    @HostBinding('class') componentCssClass : any;
    theme = 'default-theme';
    themeData: any;
    showHeaderBar: boolean = true;

    constructor(private activatedRoute: ActivatedRoute, public overlayContainer: OverlayContainer,private router: Router) {
        this.getOnlineThemeData();
        this.setHeaderVisibility(); // Initialize header visibility logic
    }
    private getOnlineThemeData() {

        this.activatedRoute.data.subscribe(({ themeData }) => {
            if (CommonUtility.isNotEmpty(themeData)) {
                this.themeData = themeData;
                this.overlayContainer.getContainerElement().classList.add(this.theme);
                this.componentCssClass = this.themeData.onlineTheme;
               // console.log(this.themeData.onlineTheme);
            }

        });

    }
    private setHeaderVisibility() {
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Check the current route to determine if the header should be shown
            const currentRoute = event.urlAfterRedirects;
            this.showHeaderBar = currentRoute !== '/login'; // Hide the header on '/login'
          }
        });
      }
}

import { Component, OnInit } from '@angular/core';
import { UserAuthService, CommonUtility, APIConstant } from '@app-core';
import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from 'src/app/public/public.service';

@Component({
    selector: 'public-header-bar',
    templateUrl: './public-header-bar.component.html',
    styleUrls: ['public-header-bar.component.scss']
})

export class PublicHeaderBarComponent implements OnInit {

    userLoggedIn: boolean = false;
    public href: string = "";
    isHome: boolean = true;
    isContact: boolean = true;
    isTerms: boolean = true;
    isPolicy: boolean = true;
    isFaq: boolean = true;
    imagePath: string = 'assets/images/Tata_Logo.jpg';
    basePath: string = APIConstant.basePath;
    locationImage: string = '';
    showHeader: boolean = true;

    constructor(private userAuthService: UserAuthService, private router: Router,
        private publicService: PublicService) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                  // Check if the current route is '/login'
                  this.showHeader = event.url == '/viewProfile';
                }
              });
    }

    ngOnInit() {
        this.href = this.router.url;
        const user: any = this.userAuthService.getUser();
        
    }
  
}
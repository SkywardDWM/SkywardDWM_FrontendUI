import { Component } from '@angular/core';
import { PublicService } from 'src/app/public/public.service';

@Component({
    selector: 'footer-bar',
    templateUrl: './footer-bar.component.html',
    styleUrls: ['footer-bar.component.scss']
})
export class FooterBarComponent {
    isHome: boolean = true;
    isContact: boolean = true;
    isTerms: boolean = true;
    isPolicy: boolean = true;
    isFaq: boolean = true;

    copyrightText: string;

    constructor(private publicService: PublicService) {
        const currentYear = new Date().getFullYear();
        this.copyrightText = `Copyright © ${currentYear} All Rights Reserved by Tata Advanced Systems.`;
    }
}
// import { RateCardsPageComponent } from './rate_cards_page_component/rate.cards.page.component';
// import { PayrollPageComponent } from './payroll_page_component/payroll.page.component';
// import { PayrollNavComponent } from './payroll_nav_component/payroll.nav.component';
// import { TranslateService } from 'ng2-translate';
// import { LoggerService, LoggingLevels } from '../shared/logger.service';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { INavPage } from './payroll_nav_component/payroll.nav.component';
import { Component } from '@angular/core';

@Component({
    // directives: [PayrollNavComponent],
    selector: 'hm-payroll-component',
    template: `
        <!--
        <div>
            <payroll-nav-component
                [pages]="pages"
                [rootPage]="rootPage"
                (showPage)="__showPage($event)"
            ></payroll-nav-component>
        </div>
        <div>
            <ion-nav [root]="rootPage.component" #content></ion-nav>
        </div>
        -->
        <h1> Payroll Component 22</h1>
        <hm-input-numeric></hm-input-numeric>
    `,
})
export class PayrollComponent {
    // @ViewChild(Nav) private nav: Nav;

    // private pages: INavPage[];
    // private rootPage: INavPage;

    // constructor(
    //     private translateService: TranslateService,
    //     private logger: LoggerService,
    //     private platform: Platform) {
    // }

    // public ngOnInit() {
    //     this.rootPage = {
    //         component: PayrollPageComponent,
    //         icon: 'chatbubbles',
    //         title: 'Payroll',
    //     };
    //     this.logger.logLevel = LoggingLevels.Debug;

    //     this.pages = [
    //         this.rootPage,
    //         {
    //             component: RateCardsPageComponent,
    //             icon: 'chatbubbles',
    //             title: 'Rate cards',
    //         },
    //     ];
    // }

    // public __showPage(page: INavPage): void {
    //     this.nav.setRoot(page.component);
    // }
}

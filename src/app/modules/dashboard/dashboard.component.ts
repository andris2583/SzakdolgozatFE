import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    @ViewChild('dashboardImage')
    dashboardImage: ElementRef | undefined;
    stickyHeader: boolean = false;
    headerImageURL: string = '../../../assets/dashboard/dashboard' + Math.floor(Math.random() * 5) + '.jpg';
    seasonalTags: string[] = [];
    favouriteTags: string[] = [];

    constructor(private authService: AuthService, private renderer: Renderer2, private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.dashboardService.getSeasonalTags().subscribe(value => {
            this.seasonalTags = value;
        });
        this.dashboardService.getFavouriteTags(this.authService.getCurrentUser()).subscribe(value => {
            this.favouriteTags = value;
        });
    }

    ngAfterViewInit(): void {
        this.renderer.listen(this.dashboardImage?.nativeElement.parentElement.parentElement.parentElement.parentElement, 'scroll', (event) => {
            if (this.dashboardImage) {
                const rect = this.dashboardImage.nativeElement.getBoundingClientRect();
                this.stickyHeader = (rect.height + rect.top) < 0;
            }
        });
    }


}


import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    @ViewChild('dashboardImage')
    dashboardImage: ElementRef | undefined;
    stickyHeader: boolean = false;

    constructor(private authService: AuthService, private renderer: Renderer2) {
    }

    ngOnInit(): void {
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


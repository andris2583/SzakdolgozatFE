import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Page} from '../../models/page.model';
import {Router} from '@angular/router';
import {Pages} from '../../models/constants/pages';
import {ProfileTabs} from '../../models/constants/profile-tabs';
import {ImageUploadDialogComponent} from '../images/image-upload-dialog/image-upload-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from '../../services/auth/storage-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    @Input()
    public dashboardHeader: boolean = false;

    public profileDropdownOpen: boolean = false;

    public pages = new Pages().pages;

    public profileTabs = [ProfileTabs.IMAGES, ProfileTabs.COLLECTIONS, ProfileTabs.TIMELINE];

    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};

    public adminPage: Page = {route: '/admin', name: 'Admin', protected: true}

    @ViewChild('profileDropdownTab') profileDropdownTab: ElementRef | undefined;
    @ViewChild('profileDropdownButton') profileDropdownButton: ElementRef | undefined;

    constructor(public authService: AuthService, public storageService: StorageService, public router: Router, private renderer: Renderer2, private dialog: MatDialog) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.renderer.listen('window', 'click', (event) => {
            if (this.profileDropdownTab != undefined && this.profileDropdownButton != undefined) {
                // @ts-ignore
                if (event.target != this.profileDropdownTab.nativeElement && !this.profileDropdownButton._elementRef.nativeElement.contains(event.target)) {
                    this.profileDropdownOpen = false;
                }
            }
        });
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    shouldPageBeShown(page: Page): boolean {
        let loggedIn = this.storageService.isLoggedIn();
        if (loggedIn) {
            return page.protected;
        } else {
            return !page.protected;
        }
    }

    shouldHeaderBeShown() {
        return !this.router.url.startsWith('/dashboard');
    }

    profileDropdownClick(e: MouseEvent) {
        this.profileDropdownOpen = !this.profileDropdownOpen;
        if (e.stopPropagation) e.stopPropagation();
    }

    goToProfile(e: MouseEvent, subPage?: any) {
        if (subPage) {
            this.router.navigate([this.profilePage.route + '/' + this.authService.getCurrentUser().id + '/' + subPage]);
        } else {
            this.router.navigate([this.profilePage.route + '/' + this.authService.getCurrentUser().id + '/ ']);
        }
        if (e.stopPropagation) e.stopPropagation();
        this.profileDropdownOpen = false;
    }


    openImageUploadDialog() {
        let dialogRef = this.dialog.open(ImageUploadDialogComponent, {
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        // instance.uploadImage.subscribe((uploadedImage: Image) => {
        //     this.images.push(uploadedImage);
        // });
    }
}

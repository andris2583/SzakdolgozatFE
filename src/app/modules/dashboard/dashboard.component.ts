import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {ImageUtilService} from '../../services/image/image-util.service';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/collection/collection.service';
import {ImageViewDialogComponent} from '../images/image-view-dialog/image-view-dialog.component';
import {Dialog} from '@angular/cdk/dialog';

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
    similarToUsersImages: Image[] = [];
    images: Image[] = [];
    userCollections: Collection[] = [];
    batchImageRequest: BatchImageRequest = this.imageUtilService.defaultBatchImageRequest;

    constructor(private authService: AuthService,
                private renderer: Renderer2,
                private dashboardService: DashboardService,
                private imageService: ImageService,
                private imageUtilService: ImageUtilService,
                private collectionService: CollectionService,
                private dialog: Dialog) {
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(value => {
            this.userCollections = value;
        });
        this.dashboardService.getSeasonalTags().subscribe(value => {
            this.seasonalTags = value;
        });
        this.dashboardService.getFavouriteTags(this.authService.getCurrentUser()).subscribe(value => {
            this.favouriteTags = value;
        });
        this.dashboardService.getSimilarToUserImages(this.authService.getCurrentUser()).subscribe(value => {
            this.similarToUsersImages = value;
            if (this.similarToUsersImages.length > 10) {
                this.similarToUsersImages = this.similarToUsersImages.slice(0, 10);
            }
        });
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

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

    openImageViewDialog(image: Image) {
        let dialogRef = this.dialog.open(ImageViewDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
    }

}


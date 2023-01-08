import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ImageUploadDialogComponent} from './image-upload-dialog/image-upload-dialog.component';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {MatDialog} from '@angular/material/dialog';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {AuthService} from '../../services/auth/auth.service';
import {CollectionService} from '../../services/collection/collection.service';
import {Collection} from '../../models/collection';
import {ImageUtilService} from '../../services/image/image-util.service';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

    options: NgxMasonryOptions = {
        gutter: 20,
    };

    images: Image[] = [];
    tagName: string | null = null;
    skeletonHeights: number[] = [];
    batchImageRequest: BatchImageRequest;

    sortTabOpen: boolean = false;
    filterTabOpen: boolean = false;

    @ViewChild('filterTab') filterTab: ElementRef | undefined;
    @ViewChild('sortTab') sortTab: ElementRef | undefined;
    @ViewChild('filterTabButton') filterTabButton: ElementRef | undefined;
    @ViewChild('sortTabButton') sortTabButton: ElementRef | undefined;

    orderByTypes = RequestOrderByType;

    // @ts-ignore
    userCollections: Collection[];

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2,
        private authService: AuthService,
        private collectionService: CollectionService,
        private imageUtilService: ImageUtilService,
    ) {
        // @ts-ignore
        this.batchImageRequest = this.imageUtilService.getBatchImageRequest();
        if (this.batchImageRequest == null) {
            this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
        }
        this.tagName = this.activatedRoute.snapshot.paramMap.get('tag');
        this.batchImageRequest.tags = [this.tagName];
        this.loadImageData();
        this.generateRandomHeights();
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
            this.userCollections = collections;
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
        this.renderer.listen('window', 'click', (event) => {
            if (this.filterTab != undefined && this.filterTabButton != undefined) {
                // @ts-ignore
                if (event.target != this.filterTab.nativeElement && !this.filterTabButton._elementRef.nativeElement.contains(event.target)) {
                    this.filterTabOpen = false;
                }
            }
            if (this.sortTab != undefined && this.sortTabButton != undefined) {
                // @ts-ignore
                if (event.target != this.sortTab.nativeElement && !this.sortTabButton._elementRef.nativeElement.contains(event.target)) {
                    this.sortTabOpen = false;
                }
            }
        });
    }

    ngOnInit(): void {

    }

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

    openImageUploadDialog() {
        let dialogRef = this.dialog.open(ImageUploadDialogComponent, {
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.uploadImage.subscribe((uploadedImage: Image) => {
            this.images.push(uploadedImage);
        });
    }

    generateRandomHeights() {
        for (let i = 0; i < this.batchImageRequest.batchSize; i++) {
            this.skeletonHeights.push(Math.round(Math.floor(Math.random() * 20)) + 30);
        }
    }

    filterButtonClicked() {
        this.filterTabOpen = !this.filterTabOpen;
        this.sortTabOpen = false;
    }

    sortButtonClicked() {
        this.sortTabOpen = !this.sortTabOpen;
        this.filterTabOpen = false;
    }

    getOrderByTypeString(sortType: RequestOrderByType | null): string {
        if (sortType == null) return 'Sort';
        switch (sortType) {
            case RequestOrderByType.ALPHABETICAL:
                return 'Alphabetical';
            case RequestOrderByType.POPULAR:
                return 'Popularity';
            case RequestOrderByType.TIME:
                return 'Upload date';
        }
    }

    selectOrderByType(value: RequestOrderByType) {
        this.batchImageRequest.requestOrderByType = value;
        this.batchImageRequest.pageCount = 0;
        this.images = [];
        this.loadImageData();
    }

}

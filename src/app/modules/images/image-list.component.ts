import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ImageUploadDialogComponent} from './image-upload-dialog/image-upload-dialog.component';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {MatDialog} from '@angular/material/dialog';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {RequestOrderType} from '../../models/request/request-order-type';
import {RequestTagType} from '../../models/request/request-tag-type';
import {AuthService} from '../../services/auth/auth.service';
import {CollectionService} from '../../services/collection/collection.service';
import {Collection} from '../../models/collection';
import {CollectionType} from '../../models/collection-type';
import {
    CollectionManagerDialogComponent
} from '../shared/collection-manager-dialog/collection-manager-dialog.component';

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
    batchImageRequest: BatchImageRequest = {
        tags: ['all'],
        batchSize: 24,
        pageCount: 0,
        requestFilter: null,
        requestOrderByType: RequestOrderByType.ALPHABETICAL,
        requestOrderType: RequestOrderType.ASC,
        requestTagType: RequestTagType.OR
    };
    loading: boolean = true;

    sortTabOpen: boolean = false;
    filterTabOpen: boolean = false;

    @ViewChild('filterTab') filterTab: ElementRef | undefined;
    @ViewChild('sortTab') sortTab: ElementRef | undefined;
    @ViewChild('filterTabButton') filterTabButton: ElementRef | undefined;
    @ViewChild('sortTabButton') sortTabButton: ElementRef | undefined;

    orderByTypes = RequestOrderByType;

    // @ts-ignore
    favouriteCollection: Collection;
    // @ts-ignore
    userCollections: Collection[];

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2,
        private authService: AuthService,
        private collectionService: CollectionService
    ) {
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
            this.userCollections = collections;
            this.favouriteCollection = collections.filter(collection => collection.type == CollectionType.FAVOURITE)[0];
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
        this.tagName = this.activatedRoute.snapshot.paramMap.get('tag');
        this.batchImageRequest.tags = [this.tagName];
        this.loadImageData();
        this.generateRandomHeights();
    }

    loadImageData() {
        this.loading = true;
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
            this.loading = false;
        });

        this.batchImageRequest.pageCount++;
    }

    openImageViewDialog(image: Image) {
        let dialogRef = this.dialog.open(ImageViewDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.deletedImageEvent.subscribe((deletedImage: Image) => {
            this.images.splice(this.images.indexOf(deletedImage), 1);
        });
        instance.images = this.images;
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

    getRandomColor(): string {
        let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
        return color;
    }

    onDownloadButtonClick(event: MouseEvent, image: Image) {
        this.imageService.getImageData(image).subscribe(value => {
            const url = URL.createObjectURL(value);
            const a: any = document.createElement('a');
            a.href = url;
            a.download = image.name;
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    onUserClickEvent(event: MouseEvent) {
        if (event.stopPropagation) event.stopPropagation();
    }

    onFavouriteClickEvent(event: MouseEvent, image: Image) {
        this.collectionService.saveToFavourites(this.authService.getCurrentUser().id, image.id).subscribe(value => {
            this.userCollections[this.userCollections.indexOf(this.favouriteCollection)] = value;
            this.favouriteCollection = value;
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    onAddToCollectionClickEvent(event: MouseEvent, image: Image) {
        let dialogRef = this.dialog.open(CollectionManagerDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.collections = this.userCollections;
        instance.collectionsChanged.subscribe((collections: Collection[]) => {
            this.userCollections = collections;
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    // isFavourite(id: string): boolean {
    //     if (this.favouriteCollection != null) {
    //         return this.favouriteCollection.imageIds.includes(id);
    //     } else {
    //         return false;
    //     }
    // }
}

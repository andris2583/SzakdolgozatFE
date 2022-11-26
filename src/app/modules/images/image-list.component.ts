import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ImageUploadDialogComponent} from './image-upload-dialog/image-upload-dialog.component';
import {BatchImageRequest} from '../../models/batch-image-request.model';
import {MatDialog} from '@angular/material/dialog';

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
    batchImageRequest: BatchImageRequest = {tag: 'all', batchSize: 24, pageCount: 0};
    loading: boolean = true;

    sortTabOpen: boolean = false;
    filterTabOpen: boolean = false;

    @ViewChild('filterTab') filterTab: ElementRef | undefined;
    @ViewChild('sortTab') sortTab: ElementRef | undefined;
    @ViewChild('filterTabButton') filterTabButton: ElementRef | undefined;
    @ViewChild('sortTabButton') sortTabButton: ElementRef | undefined;

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
        this.renderer.listen('window', 'click', (event) => {
            if (this.filterTab != undefined && this.filterTabButton != undefined) {
                // @ts-ignore
                if (event.target != this.filterTab.nativeElement && !this.filterTabButton._elementRef.nativeElement.contains(event.target)) {
                    console.log(this.filterTabOpen);
                    this.filterTabOpen = false;
                }
            }
            if (this.sortTab != undefined && this.sortTabButton != undefined) {
                // @ts-ignore
                if (event.target != this.sortTab.nativeElement && !this.sortTabButton._elementRef.nativeElement.contains(event.target)) {
                    console.log(this.sortTabButton);
                    console.log(event.target);
                    console.log(this.sortTabOpen);
                    this.sortTabOpen = false;
                }
            }
        });
    }

    ngOnInit(): void {
        this.tagName = this.activatedRoute.snapshot.paramMap.get('tag');
        this.batchImageRequest.tag = this.tagName;
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
}

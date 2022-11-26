import {Component, OnInit} from '@angular/core';
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

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    options: NgxMasonryOptions = {
        gutter: 20,
    };

    images: Image[] = [];
    tagName: string | null = null;
    skeletonHeights: number[] = [];
    batchImageRequest: BatchImageRequest = {tag: 'all', batchSize: 24, pageCount: 0};
    loading: boolean = true;

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

}

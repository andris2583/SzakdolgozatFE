import {Component, OnInit} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {MatDialog} from '@angular/material/dialog';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import {ImageUploadDialogComponent} from './image-upload-dialog/image-upload-dialog.component';

@Component({
    selector: 'app-images',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute
    ) {
    }

    options: NgxMasonryOptions = {
        gutter: 20,
    };

    images: Image[] = [];
    imageToUpload: Image = {} as Image;
    tagName: string | null = null;
    skeletonHeights: number[] = [];

    ngOnInit(): void {
        this.tagName = this.activatedRoute.snapshot.paramMap.get('tag');
        this.imageService.getImages(this.tagName).subscribe(value => {
            this.images = value;
        });
        this.generateRandomHeights();
    }

    openImageViewDialog(image: Image) {
        let dialogRef = this.dialog.open(ImageViewDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.deletedImageEvent.subscribe(deletedImage => {
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
        instance.uploadImage.subscribe(uploadedImage => {
            this.images.push(uploadedImage);
        });
    }

    generateRandomHeights() {
        for (let i = 0; i < 30; i++) {
            this.skeletonHeights.push(Math.round(Math.floor(Math.random() * 20)) + 30);
        }
    }

}

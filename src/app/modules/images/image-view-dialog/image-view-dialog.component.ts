import {Component, EventEmitter, HostListener, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../services/image/image.service';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
    selector: 'app-image-view-dialog',
    templateUrl: './image-view-dialog.component.html',
    styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private imageService: ImageService,
    ) {
    }


    images: Image[] = [];

    similarImages: Image[] = [];

    loading: boolean = true;

    similarImagesLoaded: boolean = true;

    @Output()
    deletedImageEvent = new EventEmitter<Image>();

    options: NgxMasonryOptions = {
        gutter: 20,
    };

    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '80%');
        this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
            this.similarImages = value.filter(image => image.id != this.image.id);
        });
    }

    downloadButtonClick() {
        this.imageService.getImageData(this.image).subscribe(value => {
            const url = URL.createObjectURL(value);
            const a: any = document.createElement('a');
            a.href = url;
            a.download = this.image.name;
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    }

    goLeft() {
        this.loading = true;
        this.similarImagesLoaded = false;
        // @ts-ignore
        if (this.images.indexOf(this.image) == 0) {
            this.loading = false;
            this.similarImagesLoaded = true;
        } else {
            this.image = this.images[this.images.indexOf(this.image) - 1];
            this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
                this.similarImages = value.filter(image => image.id != this.image.id);
                this.similarImagesLoaded = true;
            });
        }
    }

    goRight() {
        this.loading = true;
        this.similarImagesLoaded = false;
        // @ts-ignore
        if (this.images.indexOf(this.image) == this.images.length - 1) {
            this.loading = false;
            this.similarImagesLoaded = true;
        } else {
            this.image = this.images[this.images.indexOf(this.image) + 1];
            this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
                this.similarImages = value.filter(image => image.id != this.image.id);
                this.similarImagesLoaded = true;
            });
        }
    }

    onLoad() {
        this.loading = false;
    }

    deleteImage() {
        this.deletedImageEvent.emit(this.image);
        this.imageService.deleteImage(this.image).subscribe(() => {

        });
        this.dialogRef.close();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'ArrowLeft') {
            this.goLeft();
        } else if (event.key == 'ArrowRight') {
            this.goRight();
        }
    }

    getImagePropertyEntries(): [string, any][] {
        return Object.entries(this.image.properties);
    }

    imageClicked(image: Image) {
        this.loading = true;
        this.similarImagesLoaded = false;
        this.image = image;
        this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
            this.images = this.similarImages;
            this.similarImages = value.filter(image => image.id != this.image.id);
            this.similarImagesLoaded = true;
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {MatDialog} from '@angular/material/dialog';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import exifr from 'exifr';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
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
        fitWidth: true
    };

    images: Image[] = [];

    imageToUpload: Image = {} as Image;

    categoryName: string | null = null;

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            param => {
                this.imageService.getAllImages().subscribe(value => {
                    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
                    if (this.categoryName != 'all') {
                        // @ts-ignore
                        this.images = value.filter(value1 => value1.categories.includes(this.categoryName));
                    } else {
                        this.images = value;
                    }
                });
            }
        );
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

    handleFileInput(event: Event) {
        // @ts-ignore
        exifr.parse(event.target.files[0])
            .then(output => console.log(output));
        // @ts-ignore
        console.log(event.target.files[0]);
        // @ts-ignore
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            // @ts-ignore
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = () => {
                this.imageToUpload.imgB64 = (reader.result as string).replace('data:image/jpeg;base64,', '');
                // @ts-ignore
                this.imageToUpload.name = event.target.files[i].name;
                this.imageToUpload.location = 'Kecskemét';
                this.imageToUpload.categories = [];
                // this.uploadImageButtonClick();
            };
        }

    }

    uploadImageButtonClick() {
        this.imageService.insertImage(this.imageToUpload).subscribe(image => {
            this.images.push(image);
        });
    }

}

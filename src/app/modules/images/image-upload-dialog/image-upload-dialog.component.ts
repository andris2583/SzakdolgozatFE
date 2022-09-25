import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ImageService} from '../../../services/image/image.service';
import {Image} from '../../../models/image.model';
import exifr from 'exifr';

@Component({
    selector: 'app-image-upload-dialog',
    templateUrl: './image-upload-dialog.component.html',
    styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent implements OnInit {

    constructor(
        // @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private imageService: ImageService,
    ) {
    }

    @Output()
    uploadImage = new EventEmitter<Image>();

    public image: Image = {} as Image;
    public imageUrl: any;

    ngOnInit(): void {
    }

    handleFileInput(event: Event) {
        // @ts-ignore
        exifr.parse(event.target.files[0], true)
            .then((output: any) => {
                this.image.properties = output;
                for (let prop of Object.entries(this.image.properties)) {
                    if (typeof prop[1] == 'object') {
                        // @ts-ignore
                        delete this.image.properties[prop[0]];
                    }
                }
                console.log(this.image.properties);
            });
        // @ts-ignore
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            // @ts-ignore
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = () => {
                this.imageService.getTags((reader.result as string).replace('data:image/jpeg;base64,', '')).subscribe(value => {
                    this.image.tags = value;
                    this.image.imgB64 = (reader.result as string).replace('data:image/jpeg;base64,', '');
                    // @ts-ignore
                    this.image.name = event.target.files[i].name;
                    this.imageUrl = reader.result;
                });
            };
        }
    }

    uploadButtonClick() {
        this.imageService.insertImage(this.image).subscribe(value => {
            this.uploadImage.emit(value);
        });
        this.dialogRef.close();
    }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ImageService} from '../../../services/image/image.service';
import {Image} from '../../../models/image.model';
import exifr from 'exifr';
import {FileHandle} from '../../../directives/drag-drop/drag-drop.directive';

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

    public images: Image[] = [];

    ngOnInit(): void {
    }

    filesUploaded(event: Event) {
        let files: File[] = [];
        // @ts-ignore
        for (let file of event.target.files) {
            files.push(file);
        }
        this.handleFiles(files);
    }

    filesDropped(event: FileHandle[]) {
        let files: File[] = [];
        for (let file of event) {
            files.push(file.file);
        }
        this.handleFiles(files);
    }

    handleFiles(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            let image = {} as Image;
            exifr.parse(files[0], true)
                .then((output: any) => {
                    image.properties = output;
                    for (let prop of Object.entries(image.properties)) {
                        if (typeof prop[1] == 'object') {
                            // @ts-ignore
                            delete this.image.properties[prop[0]];
                        }
                    }
                });
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                this.imageService.getTags((reader.result as string).replace('data:image/jpeg;base64,', '')).subscribe(value => {
                    image.tags = value;
                    image.imgB64 = (reader.result as string).replace('data:image/jpeg;base64,', '');
                    image.name = files[i].name;
                });
            };
            this.images.push(image);
        }
    }

    uploadButtonClick() {
        for (let image of this.images) {
            this.imageService.insertImage(image).subscribe(value => {
                this.uploadImage.emit(value);
            });
        }
        this.dialogRef.close();
    }


}

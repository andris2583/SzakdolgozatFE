import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../services/image/image.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
    selector: 'app-image-editor-dialog',
    templateUrl: './image-editor-dialog.component.html',
    styleUrls: ['./image-editor-dialog.component.scss']
})
export class ImageEditorDialogComponent implements OnInit {


    sepia: number = 0;
    grayScale: number = 0;
    hueRotate: number = 0;
    saturate: number = 1;
    brightness: number = 1;
    blur: number = 0;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private imageService: ImageService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '80%');
        this.initData();
    }

    initData() {
        // @ts-ignore
        if (this.image.properties['sepia']) {
            // @ts-ignore
            this.sepia = this.image.properties['sepia'];
        }
        // @ts-ignore
        if (this.image.properties['grayScale']) {
            // @ts-ignore
            this.grayScale = this.image.properties['grayScale'];
        }
        // @ts-ignore
        if (this.image.properties['hueRotate']) {
            // @ts-ignore
            this.hueRotate = this.image.properties['hueRotate'];
        }
        // @ts-ignore
        if (this.image.properties['saturate']) {
            // @ts-ignore
            this.saturate = this.image.properties['saturate'];
        }
        // @ts-ignore
        if (this.image.properties['brightness']) {
            // @ts-ignore
            this.brightness = this.image.properties['brightness'];
        }
        // @ts-ignore
        if (this.image.properties['blur']) {
            // @ts-ignore
            this.blur = this.image.properties['blur'];
        }
    }

    cancelButtonClick() {
        this.dialogRef.close();
    }

    saveButtonClick() {
        // @ts-ignore
        this.image.properties['sepia'] = this.sepia;
        // @ts-ignore
        this.image.properties['grayScale'] = this.grayScale;
        // @ts-ignore
        this.image.properties['hueRotate'] = this.hueRotate;
        // @ts-ignore
        this.image.properties['saturate'] = this.saturate;
        // @ts-ignore
        this.image.properties['brightness'] = this.brightness;
        // @ts-ignore
        this.image.properties['blur'] = this.blur;
        this.imageService.updateImage(this.image).subscribe(() => {
            this.dialogRef.close();
        });
    }

    resetButtonClick() {
        this.initData();
    }
}

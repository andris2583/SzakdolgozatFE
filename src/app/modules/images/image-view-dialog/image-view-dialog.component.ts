import {Component, EventEmitter, HostListener, Inject, OnInit, Optional, Output, ViewChildren} from '@angular/core';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../services/image/image.service';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
    CollectionManagerDialogComponent
} from '../../shared/collection-manager-dialog/collection-manager-dialog.component';
import {Collection} from '../../../models/collection';
import {CollectionService} from '../../../services/collection/collection.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Privacy} from '../../../models/privacy';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';
import {CollectionType} from '../../../models/collection-type';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-image-view-dialog',
    templateUrl: './image-view-dialog.component.html',
    styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private imageService: ImageService,
        private dialog: MatDialog,
        private collectionService: CollectionService,
        public authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        let imageId = this.activatedRoute.snapshot.paramMap.get('imageId');
        if (imageId) {
            this.imageService.getById(imageId).subscribe(value => {
                this.image = value;
                this.initData();
            });
        } else {
            this.dialogRef.updateSize('80%', '80%');
            this.initData();
        }
    }


    images: Image[] = [];
    similarImages: Image[] = [];
    loading: boolean = true;
    similarImagesLoaded: boolean = false;
    @Output()
    deletedImageEvent = new EventEmitter<Image>();
    @Output()
    collectionsChanged = new EventEmitter<Collection[]>;
    options: NgxMasonryOptions = {
        gutter: 20,
    };
    @ViewChildren('similarImageList')
    similarImageList!: NgxMasonryComponent;
    userCollections: Collection[] = [];
    owner: Observable<User> = new Observable<User>();
    imageViews: Observable<number> = new Observable<number>();
    imageLikes: Observable<number> = new Observable<number>();

    ngOnInit(): void {
    }

    initData() {
        this.owner = this.authService.getUserById(this.image.ownerId);
        this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
            this.similarImages = value.filter(image => image.id != this.image.id);
            this.similarImagesLoaded = true;
        });
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(value => {
            this.userCollections = value;
        });
        this.imageViews = this.imageService.addViewToImage(this.image.id);
        this.imageLikes = this.imageService.getImageLikes(this.image.id);
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

    onLoad(event: boolean) {
        if (event) {
            this.loading = false;
        }
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

    onAddToCollectionClickEvent(event: MouseEvent) {
        let dialogRef = this.dialog.open(CollectionManagerDialogComponent, {
            data: this.image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        // @ts-ignore
        instance.collections = this.userCollections;
        // @ts-ignore
        instance.collectionsChanged.subscribe((collections: Collection[]) => {
            // @ts-ignore
            this.userCollections = collections;
            this.imageLikes = this.imageService.getImageLikes(this.image.id);
            this.collectionsChanged.emit(this.userCollections);
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    onFavouriteClickEvent(event: MouseEvent) {
        let favouriteCollection = this.userCollections.filter(tempCollection => tempCollection.type == CollectionType.FAVOURITE)[0];
        if (favouriteCollection.imageIds.includes(this.image.id)) {
            favouriteCollection.imageIds.splice(favouriteCollection.imageIds.indexOf(this.image.id), 1);
        } else {
            favouriteCollection.imageIds.push(this.image.id);
        }
        this.collectionService.saveCollection(favouriteCollection).subscribe(value => {
            this.collectionsChanged.emit(this.userCollections);
            this.imageLikes = this.imageService.getImageLikes(this.image.id);
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    getImagePropertyEntries(): [string, any][] {
        if (this.image && this.image.properties) {
            return Object.entries(this.image.properties);
        } else {
            return [];
        }
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

    privacyChanged() {
        if (this.image.privacy == Privacy.PRIVATE) {
            this.image.privacy = Privacy.PUBLIC;
        } else if (this.image.privacy == Privacy.PUBLIC) {
            this.image.privacy = Privacy.PRIVATE;
        }
        if (this.image) {
            this.imageService.updateImage(this.image).subscribe(value => {
                this.image = value;
            });
        }
    }

}

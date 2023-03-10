import {
    Component,
    EventEmitter,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChildren
} from '@angular/core';
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
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExifFields} from '../../../models/constants/exif-fields';
import * as L from 'leaflet';
import {latLng, LeafletMouseEvent, Map as LeafletMap, MapOptions, tileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Page} from '../../../models/page.model';
import {ImageEditorDialogComponent} from '../image-editor-dialog/image-editor-dialog.component';
import {ImageUtilService} from '../../../services/image/image-util.service';

@Component({
    selector: 'app-image-view-dialog',
    templateUrl: './image-view-dialog.component.html',
    styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit, OnDestroy {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private imageService: ImageService,
        private dialog: MatDialog,
        private collectionService: CollectionService,
        public authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        public imageUtilService: ImageUtilService,
    ) {
        let imageId = this.activatedRoute.snapshot.paramMap.get('imageId');
        if (imageId) {
            this.imageService.getById(imageId).subscribe(value => {
                this.image = value;
                this.isDialog = false;
                this.initData();
            });
        } else {
            this.isDialog = true;
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
    masonryOptions: NgxMasonryOptions = {
        gutter: 20,
    };
    @ViewChildren('similarImageList')
    similarImageList!: NgxMasonryComponent;
    userCollections: Collection[] = [];
    owner: Observable<User> = new Observable<User>();
    imageViews: Observable<number> = new Observable<number>();
    imageLikes: Observable<number> = new Observable<number>();
    exifFields = ExifFields;
    imageProperties: Map<String, String> = new Map<String, String>();
    isDialog: boolean = true;

    options: MapOptions = {
        layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            opacity: 0.7,
            maxZoom: 19,
            detectRetina: true,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })],
        zoomControl: false,
        zoom: 1,
        center: latLng(0, 0)
    };
    public map: LeafletMap | undefined;
    public zoom: number | undefined;
    public mapMarkers: L.Marker[] = [];
    fullScreenImage: boolean = false;
    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};

    ngOnInit(): void {
    }

    ngOnDestroy() {
        let highestIntervalId = setInterval(';');
        for (let i = 0; i < highestIntervalId; i++) {
            clearInterval(i);
        }

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
        this.imageProperties = new Map<String, String>(Object.entries(this.image.properties));
        for (let i = 0; i < this.mapMarkers.length; i++) {
            // @ts-ignore
            this.map.removeLayer(this.mapMarkers[i]);
        }
        this.initMap();
    }

    initMap() {
        if (this.imageProperties.get('latitude') && this.imageProperties.get('longitude') && this.map) {
            let marker = L.marker([Number(this.imageProperties.get('latitude')), Number(this.imageProperties.get('longitude'))]);
            this.mapMarkers.push(marker);
            // @ts-ignore
            marker.addTo(this.map);
            this.map.setView([Number(this.imageProperties.get('latitude')), Number(this.imageProperties.get('longitude'))], 6);
        } else if (this.map) {
            this.map.setView([0, 0], 1);
        }
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
        if (this.isDialog) {
            if (this.images.indexOf(this.image) != 0) {
                this.loading = true;
                this.similarImagesLoaded = false;
                this.image = this.images[this.images.indexOf(this.image) - 1];
                this.initData();
            }
        }
    }

    goRight() {
        if (this.isDialog) {
            if (this.images.indexOf(this.image) != this.images.length - 1) {
                this.loading = true;
                this.similarImagesLoaded = false;
                this.image = this.images[this.images.indexOf(this.image) + 1];
                this.initData();
            }
        }
    }

    onLoad(event: boolean) {
        if (event) {
            this.loading = false;
        }
    }

    deleteImage() {
        this.imageService.deleteImage(this.image).subscribe(() => {
            this.deletedImageEvent.emit(this.image);
            if (!this.isDialog) {
                this.router.navigate(['dashboard']);
            }
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
        // this.loading = true;
        // this.similarImagesLoaded = false;
        // this.image = image;
        // this.imageService.getSimilarImages(this.image.tags).subscribe(value => {
        //     this.images = this.similarImages;
        //     this.similarImages = value.filter(image => image.id != this.image.id);
        //     this.similarImagesLoaded = true;
        // });
        this.loading = true;
        this.similarImagesLoaded = false;
        this.image = image;
        this.initData();

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

    shareWithUrl() {
        this.snackBar.open('URL copied to clipboard!', '', {duration: 5000});
    }


    onMapReady(map: LeafletMap) {
        this.map = map;
        this.zoom = map.getZoom();
        this.initMap();
        setInterval(function () {
            //TODO check if runs after leaving this comp
            if (map) {
                map.invalidateSize();
            }
        }, 100);
    }

    onMapClick(e: LeafletMouseEvent) {
        if (this.authService.getCurrentUser().id == this.image.ownerId && this.map) {
            this.map.doubleClickZoom.disable();
            for (let i = 0; i < this.mapMarkers.length; i++) {
                // @ts-ignore
                this.map.removeLayer(this.mapMarkers[i]);
            }
            let marker = L.marker([e.latlng.lat, e.latlng.lng]);
            this.mapMarkers.push(marker);
            marker.addTo(this.map);
            // @ts-ignore
            this.image.properties.latitude = e.latlng.lat;
            // @ts-ignore
            this.image.properties.longitude = e.latlng.lng;
            this.imageService.updateImage(this.image).subscribe(value => {

            });
        }
    }

    saveImage() {
        this.imageService.updateImage(this.image).subscribe(value => this.image = value);
    }

    onUserClickEvent(event: MouseEvent, userId: string) {
        this.router.navigate([this.profilePage.route + '/' + userId + '/ ']);
        if (event.stopPropagation) event.stopPropagation();
        this.dialogRef.close();
    }

    openImageEditDialog() {
        let dialogRef = this.dialog.open(ImageEditorDialogComponent, {
            data: this.image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
    }
}

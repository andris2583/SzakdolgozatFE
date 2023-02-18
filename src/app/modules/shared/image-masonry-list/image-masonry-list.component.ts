import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Image} from '../../../models/image.model';
import {CollectionType} from '../../../models/collection-type';
import {CollectionManagerDialogComponent} from '../collection-manager-dialog/collection-manager-dialog.component';
import {Collection} from '../../../models/collection';
import {ImageService} from '../../../services/image/image.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {CollectionService} from '../../../services/collection/collection.service';
import {ImageUtilService} from '../../../services/image/image-util.service';
import {ImageViewDialogComponent} from '../../images/image-view-dialog/image-view-dialog.component';
import {NgxMasonryOptions} from 'ngx-masonry';
import {Page} from '../../../models/page.model';

@Component({
    selector: 'app-image-masonry-list',
    templateUrl: './image-masonry-list.component.html',
    styleUrls: ['./image-masonry-list.component.scss']
})
export class ImageMasonryListComponent implements OnInit {

    @Input()
    images: Image[] = [];
    @Input()
    userCollections: Collection[] = [];
    options: NgxMasonryOptions = {
        gutter: 40,
    };
    @Output()
    loadImageData = new EventEmitter<null>();
    @Output()
    collectionChanged = new EventEmitter<Collection[]>();
    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};

    constructor(private imageService: ImageService,
                public dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private renderer: Renderer2,
                public authService: AuthService,
                private collectionService: CollectionService,
                private imageUtilService: ImageUtilService,) {
    }

    ngOnInit(): void {
    }

    getRandomColor(): string {
        let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
        return color;
    }

    onDownloadButtonClick(event: MouseEvent, image: Image) {
        this.imageService.getImageData(image).subscribe(value => {
            const url = URL.createObjectURL(value);
            const a: any = document.createElement('a');
            a.href = url;
            a.download = image.name;
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    onUserClickEvent(event: MouseEvent, userId: string) {
        this.router.navigate([this.profilePage.route + '/' + userId + '/ ']);
        if (event.stopPropagation) event.stopPropagation();
    }

    onFavouriteClickEvent(event: MouseEvent, image: Image) {
        let favouriteCollection = this.userCollections.filter(tempCollection => tempCollection.type == CollectionType.FAVOURITE)[0];
        if (favouriteCollection.imageIds.includes(image.id)) {
            favouriteCollection.imageIds.splice(favouriteCollection.imageIds.indexOf(image.id), 1);
        } else {
            favouriteCollection.imageIds.push(image.id);
        }
        this.collectionService.saveCollection(favouriteCollection).subscribe(value => {
            this.collectionChanged.emit(this.userCollections);
        });
        if (event.stopPropagation) event.stopPropagation();
    }

    onAddToCollectionClickEvent(event: MouseEvent, image: Image) {
        let dialogRef = this.dialog.open(CollectionManagerDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.collections = this.userCollections;
        instance.collectionsChanged.subscribe((collections: Collection[]) => {
            this.userCollections = collections;
            this.collectionChanged.emit(collections);
        });
        if (event.stopPropagation) event.stopPropagation();
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

    scrolled() {
        this.loadImageData.emit();
    }
}

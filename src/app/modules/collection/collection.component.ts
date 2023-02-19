import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Collection} from '../../models/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../services/collection/collection.service';
import {Image} from '../../models/image.model';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {ImageUtilService} from '../../services/image/image-util.service';
import {ImageService} from '../../services/image/image.service';
import {AuthService} from '../../services/auth/auth.service';
import {Privacy} from '../../models/privacy';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

    collection: Collection | null = null;
    images: Image[] = [];
    userCollections: Collection[] = [];
    batchImageRequest: BatchImageRequest;
    collectionId: string;
    editingName: boolean = false;
    @ViewChild('CollectionNameForm')
    collectionNameForm: ElementRef | undefined;


    constructor(private activatedRoute: ActivatedRoute,
                private collectionService: CollectionService,
                private imageUtilService: ImageUtilService,
                private imageService: ImageService,
                public authService: AuthService,
                private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // @ts-ignore
        this.collectionId = this.activatedRoute.snapshot.paramMap.get('id');
        this.collectionService.getCollectionsById(this.collectionId).subscribe(value => {
            this.collection = value;
        });
        this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
        this.batchImageRequest.collectionId = this.collectionId;
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
            this.userCollections = collections;
        });
        this.loadImageData();
    }

    ngOnInit(): void {
    }

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

    onCollectionChanged($event: Collection[]) {
        this.resetData();
    }

    resetData() {
        this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
        this.batchImageRequest.collectionId = this.collectionId;
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
            this.userCollections = collections;
        });
        this.images = [];
        this.loadImageData();
    }

    editButtonClicked() {
        this.editingName = !this.editingName;
        if (this.editingName) {
            setTimeout(() => {
                if (this.collectionNameForm) {
                    this.collectionNameForm.nativeElement.focus();
                }
            }, 0);
        } else {
            if (this.collection) {
                this.collectionService.saveCollection(this.collection).subscribe(value => {
                    this.collection = value;
                });
            }
        }
    }

    privacyChanged() {
        if (this.collection?.privacy == Privacy.PRIVATE) {
            this.collection.privacy = Privacy.PUBLIC;
        } else if (this.collection?.privacy == Privacy.PUBLIC) {
            this.collection.privacy = Privacy.PRIVATE;
        }
        if (this.collection) {
            this.collectionService.saveCollection(this.collection).subscribe(value => {
                this.collection = value;
            });
        }
    }
}

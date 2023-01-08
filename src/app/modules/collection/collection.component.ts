import {Component, OnInit} from '@angular/core';
import {Collection} from '../../models/collection';
import {ActivatedRoute} from '@angular/router';
import {CollectionService} from '../../services/collection/collection.service';
import {Image} from '../../models/image.model';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {ImageUtilService} from '../../services/image/image-util.service';
import {ImageService} from '../../services/image/image.service';
import {AuthService} from '../../services/auth/auth.service';

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

    constructor(private activatedRoute: ActivatedRoute,
                private collectionService: CollectionService,
                private imageUtilService: ImageUtilService,
                private imageService: ImageService,
                private authService: AuthService) {
        // @ts-ignore
        this.collectionId = this.activatedRoute.snapshot.paramMap.get('id');
        this.collectionService.getCollectionsById(this.collectionId).subscribe(value => {
            this.collection = value;
            console.log(this.collection);
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
}

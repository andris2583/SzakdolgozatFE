import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {ProfileTabs} from '../../models/constants/profile-tabs';
import {Observable} from 'rxjs';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/collection/collection.service';
import {ImageService} from '../../services/image/image.service';
import {Image} from '../../models/image.model';
import {ImageUtilService} from '../../services/image/image-util.service';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User | null = null;
    public tabs = ProfileTabs;
    public activeTab = this.tabs.IMAGES;
    public collections: Observable<Collection[]> = new Observable<Collection[]>();
    public collectionsValue: Collection[] = [];
    public images: Image[] = [];
    public batchImageRequest: BatchImageRequest;

    constructor(private authService: AuthService,
                private router: Router,
                private collectionService: CollectionService,
                private imageService: ImageService,
                public imageUtilService: ImageUtilService) {
        this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
        this.batchImageRequest.requestFilter = {
            ownerId: this.authService.getCurrentUser().id,
            nameFilterString: null,
            maxCount: null
        };
    }

    ngOnInit(): void {
        if (this.authService.getCurrentUser() != null) {
            this.user = this.authService.getCurrentUser();
            this.collections = this.collectionService.getCollectionsByUserId(this.user!.id);
            this.collections.subscribe(collections => {
                let collectionThumbnailIdMap = new Map<string, string | null>();
                this.collectionsValue = collections;
                collections.forEach(collection => {
                    if (collection.imageIds.length != null) {
                        collectionThumbnailIdMap.set(collection.id, collection.imageIds[0]);
                    } else {
                        collectionThumbnailIdMap.set(collection.id, null);
                    }
                });
            });
        }
        this.loadImageData();
    }

    logOut() {
        this.authService.logOut();
    }

    tabButtonClick(tab: ProfileTabs) {
        this.activeTab = tab;
    }

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

}

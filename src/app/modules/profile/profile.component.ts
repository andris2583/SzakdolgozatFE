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

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User | null = null;
    public tabs = ProfileTabs;
    public activeTab = this.tabs.COLLECTIONS;
    public collections: Observable<Collection[]> = new Observable<Collection[]>();
    public collectionThumbnailImages: Map<string, Image> = new Map<string, Image>();
    public thumbnailImagesLoaded: boolean = false;

    constructor(private authService: AuthService, private router: Router, private collectionService: CollectionService, private imageService: ImageService) {
    }

    ngOnInit(): void {
        let userString = localStorage.getItem('user');
        if (userString != null) {
            this.user = JSON.parse(userString);
            this.collections = this.collectionService.getCollectionsByUserId(this.user!.id);
            this.collections.subscribe(collections => {
                let collectionThumbnailIdMap = new Map<string, string | null>();
                collections.forEach(collection => {
                    if (collection.imageIds.length != null) {
                        collectionThumbnailIdMap.set(collection.id, collection.imageIds[0]);
                    } else {
                        collectionThumbnailIdMap.set(collection.id, null);
                    }
                });
                // @ts-ignore
                this.imageService.getImagesByIds(Array.from(collectionThumbnailIdMap.values()).filter(id => typeof id == 'string')).subscribe(thumbnailImages => {
                    this.collectionThumbnailImages = new Map<string, Image>();
                    collections.forEach(collection => {
                        if (collectionThumbnailIdMap.get(collection.id) != null) {
                            this.collectionThumbnailImages.set(collection.id, thumbnailImages.filter(tempThumbnailImage => tempThumbnailImage.id == collectionThumbnailIdMap.get(collection.id))[0]);
                        }
                        this.thumbnailImagesLoaded = true;
                    });
                });
            });
        }
    }

    logOut() {
        this.authService.logOut();
    }

    tabButtonClick(tab: ProfileTabs) {
        this.activeTab = tab;
    }

    // getThumbnailData(collection: Collection): Observable<string> {
    //     return this.collectionThumbnailImages.pipe(map(collectionMap => {
    //         if (collectionMap.get(collection) != undefined) {
    //             // @ts-ignore
    //             return collectionMap.get(collection).imgB64;
    //         } else {
    //             return '';
    //         }
    //     }));
    // }
    getThumbnailData(collection: Collection): string | null {
        let image = this.collectionThumbnailImages.get(collection.id);
        if (image == null) {
            return null;
        } else {
            return image.imgB64;
        }
    }
}

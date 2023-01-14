import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {ProfileTabs} from '../../models/constants/profile-tabs';
import {Observable} from 'rxjs';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/collection/collection.service';
import {ImageService} from '../../services/image/image.service';

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

            });
        }
    }

    logOut() {
        this.authService.logOut();
    }

    tabButtonClick(tab: ProfileTabs) {
        this.activeTab = tab;
    }

}

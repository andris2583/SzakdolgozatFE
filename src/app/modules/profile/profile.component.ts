import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {ProfileTabs} from '../../models/constants/profile-tabs';
import {Observable} from 'rxjs';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/collection/collection.service';

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

    constructor(private authService: AuthService, private router: Router, private collectionService: CollectionService) {
    }

    ngOnInit(): void {
        let userString = localStorage.getItem('user');
        if (userString != null) {
            this.user = JSON.parse(userString);
            this.collections = this.collectionService.getCollectionsByUserId(this.user!.id);
        }
    }

    logOut() {
        this.authService.logOut();
    }

    tabButtonClick(tab: ProfileTabs) {
        this.activeTab = tab;
    }
}

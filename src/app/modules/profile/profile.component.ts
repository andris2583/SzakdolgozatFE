import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {ProfileTabs} from '../../models/constants/profile-tabs';
import {map, Observable} from 'rxjs';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/collection/collection.service';
import {ImageService} from '../../services/image/image.service';
import {Image} from '../../models/image.model';
import {ImageUtilService} from '../../services/image/image-util.service';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {FileHandle} from '../../directives/drag-drop/drag-drop.directive';
import {Privacy} from '../../models/privacy';
import {Page} from '../../models/page.model';
import {SubscriptionType, SubscriptionTypeMBSize} from '../../models/request/subscription-type';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

    public user: User | null = null;
    public tabEnum = ProfileTabs;
    public tabs = [ProfileTabs.IMAGES, ProfileTabs.COLLECTIONS, ProfileTabs.TIMELINE];
    public activeTab = ProfileTabs.IMAGES;
    public collections: Observable<Collection[]> = new Observable<Collection[]>();
    public collectionsValue: Collection[] = [];
    public images: Image[] = [];
    public batchImageRequest: BatchImageRequest = {} as BatchImageRequest;
    public isOwner: boolean = false;
    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};
    public profilePictureURL: string | null = null;
    public subscriptionType = SubscriptionType;
    @ViewChild('profileTabSelector') profileTabSelector: ElementRef | undefined;
    imageCount: Observable<number> = new Observable<number>();
    likeCount: Observable<number> = new Observable<number>();
    viewCount: Observable<number> = new Observable<number>();
    storage: Observable<number> = new Observable<number>();
    emited: boolean = false;

    constructor(public authService: AuthService,
                public router: Router,
                public collectionService: CollectionService,
                public imageService: ImageService,
                public imageUtilService: ImageUtilService,
                public activatedRoute: ActivatedRoute,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.authService.getUserById(this.activatedRoute.snapshot.paramMap.get('userId')!.trim()).subscribe(value => {
            if (value != null) {
                this.user = value;
                this.profilePictureURL = 'http://localhost:8080/user/getProfileData/' + this.user.id;
                this.isOwner = this.user.id == this.authService.getCurrentUser().id;
                this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
                this.batchImageRequest.requestFilter = {
                    ownerId: value.id,
                    nameFilterString: null,
                    maxCount: null,
                    fromDate: null,
                    toDate: null,
                    distance: null,
                    latitude: null,
                    longitude: null,
                };
                this.imageCount = this.imageService.getCountByUser(this.user.id);
                this.likeCount = this.imageService.getLikesByUser(this.user.id);
                this.viewCount = this.imageService.getViewsByUser(this.user.id);
                this.storage = this.imageService.getStorageByUser(this.user.id);
                this.collections = this.collectionService.getCollectionsByUserId(this.user!.id).pipe(map(collections => {
                    if (this.isOwner) {
                        return collections;
                    } else {
                        return collections.filter(collection => collection.privacy == Privacy.PUBLIC);
                    }
                }));
                this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
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
            if (this.activatedRoute.snapshot.paramMap.get('subPage')!.trim() != '') {
                this.activeTab = this.activatedRoute.snapshot.paramMap.get('subPage')!.trim() as ProfileTabs;
            }
        });
    }

    ngAfterViewInit() {
        if (this.activatedRoute.snapshot.paramMap.get('subPage')!.trim() != '') {
            if (this.profileTabSelector) {
                this.profileTabSelector.nativeElement.scrollIntoView();
            }
        }
    }

    logout() {
        this.authService.logout();
    }

    tabButtonClick(tab: ProfileTabs) {
        this.activeTab = tab;
        // this.router.navigate([this.profilePage.route + '/' + this.authService.getCurrentUser().id + '/' + tab]);
    }

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.emited = true;
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

    filesUploaded(event: Event) {
        if (this.isOwner) {
            let files: File[] = [];
            // @ts-ignore
            for (let file of event.target.files) {
                files.push(file);
            }
            this.handleFiles(files);
        }
    }

    filesDropped(event: FileHandle[]) {
        if (this.isOwner) {
            let files: File[] = [];
            for (let file of event) {
                files.push(file.file);
            }
            this.handleFiles(files);
        }
    }

    handleFiles(files: File[]) {
        let file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.authService.uploadProfilePicture(reader.result as string).subscribe(() => {
                console.log('reload');
                window.location.reload();
            });
        };
    }

    collectionsChanged() {
        // @ts-ignore
        this.likeCount = this.imageService.getLikesByUser(this.user.id);
    }

    imageDeleted() {
        // @ts-ignore
        this.imageCount = this.imageService.getCountByUser(this.user.id);
        // @ts-ignore
        this.likeCount = this.imageService.getLikesByUser(this.user.id);
        // @ts-ignore
        this.viewCount = this.imageService.getViewsByUser(this.user.id);
        // @ts-ignore
        this.storage = this.imageService.getStorageByUser(this.user.id);
    }

    imageOpened() {
        // @ts-ignore
        this.viewCount = this.imageService.getViewsByUser(this.user.id);
    }

    byteToMb(async: number | null) {
        if (async) {
            return Math.ceil(async / 1048576);
        } else {
            return 0;
        }
    }

    getMaxStorage(): number {
        switch (this.user?.subscriptionType) {
            case SubscriptionType.PRO:
                return SubscriptionTypeMBSize.PRO;
            case SubscriptionType.FREE:
                return SubscriptionTypeMBSize.FREE;
            default:
                return 0;
        }
    }

    getStorageValue(async: number | null) {
        if (async) {
            return Math.ceil((this.byteToMb(async) / this.getMaxStorage()) * 100);
        } else {
            return 0;
        }
    }

    saveUser() {
        if (this.user) {
            this.authService.updateUser(this.user).subscribe(() => {
            });
        }
    }
}

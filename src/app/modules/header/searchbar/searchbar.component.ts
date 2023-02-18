import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {TagService} from '../../../services/tag/tag.service';
import {Tag} from '../../../models/tag.model';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../services/image/image.service';
import {RequestOrderByType} from '../../../models/request/request-order-by-type';
import {RequestOrderType} from '../../../models/request/request-order-type';
import {RequestTagType} from '../../../models/request/request-tag-type';
import {map, Observable, tap} from 'rxjs';
import {ImageViewDialogComponent} from '../../images/image-view-dialog/image-view-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth/auth.service';
import {Collection} from '../../../models/collection';
import {CollectionService} from '../../../services/collection/collection.service';
import {Privacy} from '../../../models/privacy';
import {UtilService} from '../../../services/util/util.service';
import {User} from '../../../models/user.model';
import {Page} from '../../../models/page.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({height: 0, opacity: 1}),
                        animate('150ms ease-out',
                            style({height: '*', opacity: 1}))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({height: '*', opacity: 1}),
                        animate('150ms ease-in',
                            style({height: 0, opacity: 1}))
                    ]
                )
            ]
        )
    ]
})
export class SearchbarComponent implements OnInit {

    @ViewChild('searchbarContainer') searchbarContainer: ElementRef | undefined;
    @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;
    @Input()
    dashboard: boolean = false;


    allTags: Observable<Tag[]> = this.tagService.getAllTags();
    tagSuggestions: Observable<Tag[]> = new Observable<Tag[]>();
    imageSuggestions: Observable<Image[]> = new Observable<Image[]>();
    collectionSuggestions: Observable<Collection[]> = new Observable<Collection[]>();
    userSuggestions: Observable<User[]> = new Observable<User[]>();
    imageSuggestionsLoaded: boolean | undefined = undefined;
    tagSuggestionsLoaded: boolean | undefined = undefined;
    collectionSuggestionsLoaded: boolean | undefined = undefined;
    userSuggestionsLoaded: boolean | undefined = undefined;
    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};

    searchbarInFocus: boolean = false;

    searchbarValue: string = '';
    tagWidth: number = 100;

    constructor(private tagService: TagService,
                private imageService: ImageService,
                private renderer: Renderer2,
                public dialog: MatDialog,
                private authService: AuthService,
                private collectionService: CollectionService,
                public utilService: UtilService,
                private router: Router
    ) {
        this.renderer.listen('window', 'click', (event) => {
            if (this.searchbarContainer != undefined) {
                if (event.target != this.searchbarContainer.nativeElement && !this.searchbarContainer.nativeElement.contains(event.target)) {
                    this.onSearchBlur();
                }
            }
            //TODO fix this
            // if (this.dropdownMenu != undefined) {
            //     if (this.dropdownMenu?.nativeElement.contains(event.target)) {
            //         setTimeout(() => this.onSearchBlur(), 10);
            //     }
            // }
        });
    }

    ngOnInit(): void {
    }

    onSearchFocus() {
        this.searchbarInFocus = true;
    }

    onSearchBlur() {
        this.searchbarInFocus = false;
        this.searchbarValue = '';
        this.tagSuggestions = new Observable<Tag[]>();
        this.imageSuggestions = new Observable<Image[]>();
        this.collectionSuggestions = new Observable<Collection[]>();
        this.userSuggestions = new Observable<User[]>();
    }

    onEscape() {
        this.onSearchBlur();
        this.searchbarValue = '';
        let form = document.getElementById('search-input');
        form?.blur();
        this.tagSuggestions = new Observable<Tag[]>();
        this.imageSuggestions = new Observable<Image[]>();
        this.collectionSuggestions = new Observable<Collection[]>();
        this.userSuggestions = new Observable<User[]>();
    }

    onInput() {
        if (this.searchbarValue == '') {
            this.tagSuggestions = new Observable<Tag[]>();
            this.imageSuggestions = new Observable<Image[]>();
            this.collectionSuggestions = new Observable<Collection[]>();
            this.userSuggestions = new Observable<User[]>();
            this.imageSuggestionsLoaded = undefined;
            this.tagSuggestionsLoaded = undefined;
            this.collectionSuggestionsLoaded = undefined;
            this.userSuggestionsLoaded = undefined;
        } else {
            this.imageSuggestionsLoaded = false;
            this.tagSuggestionsLoaded = false;
            this.collectionSuggestionsLoaded = false;
            this.userSuggestionsLoaded = false;
            this.tagSuggestions = this.allTags.pipe(
                map(tempTags => tempTags.filter(tempTag => tempTag.name.toLowerCase().startsWith(this.searchbarValue.toLowerCase())).slice(0, 10)),
                tap(() => this.tagSuggestionsLoaded = true));
            this.imageSuggestions = this.imageService.getImages({
                tags: [],
                batchSize: -1,
                pageCount: 0,
                requestFilter: {nameFilterString: this.searchbarValue, maxCount: 10, ownerId: null},
                requestOrderByType: RequestOrderByType.ALPHABETICAL,
                requestOrderType: RequestOrderType.ASC,
                requestTagType: RequestTagType.OR,
                collectionId: null,
                requestUserId: this.authService.getCurrentUser().id,
            }).pipe(tap(() => this.imageSuggestionsLoaded = true));
            this.collectionSuggestions = this.collectionService.getAllCollections().pipe(map(allCollections => allCollections.filter(collection => {
                if ((collection.privacy == Privacy.PUBLIC) || (collection.privacy == Privacy.PRIVATE && collection.userId == this.authService.getCurrentUser().id)) {
                    return collection.name.toLowerCase().startsWith(this.searchbarValue.toLowerCase());
                }
                return false;
            })), tap(() => this.collectionSuggestionsLoaded = true));
            this.userSuggestions = this.authService.getAllUsers()
                .pipe(map(users => users.filter(user => user.username.toLowerCase().includes(this.searchbarValue.toLowerCase()))),
                    tap(() => this.userSuggestionsLoaded = true));
        }
    }

    openImageViewDialog(image: Image) {
        let dialogRef = this.dialog.open(ImageViewDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance.deletedImageEvent.subscribe((deletedImage: Image) => {
            //TODO delete image from frontend list
        });
        this.imageService.getImages({
            tags: [],
            batchSize: -1,
            pageCount: 0,
            requestFilter: null,
            requestOrderByType: RequestOrderByType.ALPHABETICAL,
            requestOrderType: RequestOrderType.ASC,
            requestTagType: RequestTagType.OR,
            collectionId: null,
            requestUserId: this.authService.getCurrentUser().id,
        }).subscribe(value => instance.images = value);
        this.onSearchBlur();
    }

    goToProfile(e: MouseEvent, userId: string) {
        this.router.navigate([this.profilePage.route + '/' + userId + '/ ']);
        if (e.stopPropagation) e.stopPropagation();
    }
}

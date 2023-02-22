import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Image} from '../../models/image.model';
import {ImageService} from '../../services/image/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMasonryOptions} from 'ngx-masonry';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {MatDialog} from '@angular/material/dialog';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {AuthService} from '../../services/auth/auth.service';
import {CollectionService} from '../../services/collection/collection.service';
import {Collection} from '../../models/collection';
import {ImageUtilService} from '../../services/image/image-util.service';
import {FormControl} from '@angular/forms';
import {Tag} from '../../models/tag.model';
import {map, Observable, startWith} from 'rxjs';
import {TagService} from '../../services/tag/tag.service';
import {RequestTagType} from '../../models/request/request-tag-type';
import * as L from 'leaflet';
import {latLng, LeafletMouseEvent, Map as LeafletMap, MapOptions, tileLayer} from 'leaflet';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

    options: NgxMasonryOptions = {
        gutter: 20,
    };

    images: Image[] = [];
    tagName: string | null = null;
    skeletonHeights: number[] = [];
    batchImageRequest: BatchImageRequest;

    sortTabOpen: boolean = false;
    filterTabOpen: boolean = true;

    @ViewChild('filterTab') filterTab: ElementRef | undefined;
    @ViewChild('sortTab') sortTab: ElementRef | undefined;
    @ViewChild('filterTabButton') filterTabButton: ElementRef | undefined;
    @ViewChild('sortTabButton') sortTabButton: ElementRef | undefined;

    orderByTypes = RequestOrderByType;

    // @ts-ignore
    userCollections: Collection[];

    tagSearch = new FormControl('');
    allTags: Tag[] = [];
    filteredSuggestions: Observable<string[]> = new Observable<string[]>();

    selection: boolean = false;

    mapOptions: MapOptions = {
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

    constructor(
        private imageService: ImageService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2,
        private authService: AuthService,
        private collectionService: CollectionService,
        private imageUtilService: ImageUtilService,
        private tagService: TagService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.batchImageRequest = this.imageUtilService.defaultBatchImageRequest;
        if (this.activatedRoute.snapshot.paramMap.get('tag')!.trim() == '') {
            this.tagName = null;
        } else {
            this.tagName = this.activatedRoute.snapshot.paramMap.get('tag')!.trim();
            this.batchImageRequest.tags = [this.tagName];
        }
        this.loadImageData();
        this.generateRandomHeights();
        this.collectionService.getCollectionsByUserId(this.authService.getCurrentUser().id).subscribe(collections => {
            this.userCollections = collections;
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
        this.renderer.listen('window', 'click', (event) => {
            if (this.filterTab != undefined && this.filterTabButton != undefined) {
                //TODO handle outside click
                // if (!this.filterTab.nativeElement.contains(event.target) && event.target != this.filterTabButton.nativeElement) {
                //     this.filterTabOpen = false;
                // }
            }
            if (this.sortTab != undefined && this.sortTabButton != undefined) {
                // @ts-ignore
                if (event.target != this.sortTab.nativeElement && !this.sortTabButton._elementRef.nativeElement.contains(event.target)) {
                    this.sortTabOpen = false;
                }
            }
        });
        this.tagService.getAllTags().subscribe(tags => {
            this.allTags = tags;
        });
        this.filteredSuggestions = this.tagSearch.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value || '').map(value => value.name)),
        );
    }

    ngOnInit(): void {

    }

    loadImageData() {
        this.imageService.getImages(this.batchImageRequest).subscribe(value => {
            this.images = this.images.concat(value);
        });

        this.batchImageRequest.pageCount++;
    }

    generateRandomHeights() {
        for (let i = 0; i < this.batchImageRequest.batchSize; i++) {
            this.skeletonHeights.push(Math.round(Math.floor(Math.random() * 20)) + 30);
        }
    }

    filterButtonClicked() {
        this.filterTabOpen = !this.filterTabOpen;
        this.sortTabOpen = false;
    }

    sortButtonClicked() {
        this.sortTabOpen = !this.sortTabOpen;
        this.filterTabOpen = false;
    }

    getOrderByTypeString(sortType: RequestOrderByType | null): string {
        if (sortType == null) return 'Sort';
        switch (sortType) {
            case RequestOrderByType.ALPHABETICAL:
                return 'Alphabetical';
            case RequestOrderByType.POPULAR:
                return 'Popularity';
            case RequestOrderByType.TIME:
                return 'Upload date';
            case RequestOrderByType.RANDOM:
                return 'Random';
        }
    }

    selectOrderByType(value: RequestOrderByType) {
        this.batchImageRequest.requestOrderByType = value;
        this.batchImageRequest.pageCount = 0;
        this.images = [];
        this.loadImageData();
    }

    addTag(value: any) {
        if (value == null) {
            value = this.tagSearch.value;
        }
        if (!this.batchImageRequest.tags.includes(value as string) && this.allTags.map(value => value.name).includes(value as string)) {
            this.batchImageRequest.tags.push(value as string);
            this.tagSearch.reset();
            this.batchImageRequest.pageCount = 0;
            this.images = [];
            this.loadImageData();
        }
    }

    deleteTag(tagToDelete: any) {
        this.batchImageRequest.tags = this.batchImageRequest.tags.filter(tempTag => tempTag != tagToDelete);
        if (this.batchImageRequest.tags.length == 0) {
            this.router.navigate(['images/list/ ']);
        } else {
            this.tagSearch.reset();
            this.batchImageRequest.pageCount = 0;
            this.images = [];
            this.loadImageData();
        }
    }

    filter(value: string): Tag[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(suggestion => suggestion.name.toLowerCase().startsWith(filterValue));
    }

    requestTagTypeChanged() {
        if (this.batchImageRequest.requestTagType == RequestTagType.AND) {
            this.batchImageRequest.requestTagType = RequestTagType.OR;
        } else if (this.batchImageRequest.requestTagType == RequestTagType.OR) {
            this.batchImageRequest.requestTagType = RequestTagType.AND;
        }
        if (this.batchImageRequest.tags.length > 1) {
            this.images = [];
            this.batchImageRequest.pageCount = 0;
            this.loadImageData();
        }
    }

    startSelection() {
        this.selection = !this.selection;
    }

    dateFilterChanged() {
        this.images = [];
        this.batchImageRequest.pageCount = 0;
        this.loadImageData();
    }

    clearDateSelection() {
        this.batchImageRequest.requestFilter!.fromDate = null;
        this.batchImageRequest.requestFilter!.toDate = null;
        this.dateFilterChanged();
    }

    onMapReady(map: LeafletMap) {
        this.map = map;
        this.zoom = map.getZoom();
        setInterval(function () {
            //TODO check if runs after leaving this comp
            if (map) {
                map.invalidateSize();
            }
        }, 100);
    }

    onMapClick(e: LeafletMouseEvent) {
        // if (this.authService.getCurrentUser().id == this.image.ownerId) {
        //     for (let i = 0; i < this.mapMarkers.length; i++) {
        //         // @ts-ignore
        //         this.map.removeLayer(this.mapMarkers[i]);
        //     }
        //     let marker = L.marker([e.latlng.lat, e.latlng.lng]);
        //     this.mapMarkers.push(marker);
        //     // @ts-ignore
        //     marker.addTo(this.map);
        //     // @ts-ignore
        //     this.image.properties.latitude = e.latlng.lat;
        //     // @ts-ignore
        //     this.image.properties.longitude = e.latlng.lng;
        //     this.imageService.updateImage(this.image).subscribe(value => {
        //
        //     });
        // }
    }
}

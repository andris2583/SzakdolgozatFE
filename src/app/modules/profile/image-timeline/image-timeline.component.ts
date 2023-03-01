import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../services/image/image.service';
import {ImageUtilService} from '../../../services/image/image-util.service';
import {BatchImageRequest} from '../../../models/request/batch-image-request.model';
import {AuthService} from '../../../services/auth/auth.service';
import {RequestOrderByType} from '../../../models/request/request-order-by-type';
import {CollectionService} from '../../../services/collection/collection.service';
import {Collection} from '../../../models/collection';
import {User} from '../../../models/user.model';
import {ImageViewDialogComponent} from '../../images/image-view-dialog/image-view-dialog.component';
import {RequestOrderType} from '../../../models/request/request-order-type';
import {RequestTagType} from '../../../models/request/request-tag-type';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-image-timeline',
    templateUrl: './image-timeline.component.html',
    styleUrls: ['./image-timeline.component.scss']
})
export class ImageTimelineComponent implements OnInit, OnChanges {

    @Input()
    user: User | undefined | null;

    batchImageRequest: BatchImageRequest = this.imageUtilService.defaultBatchImageRequest;
    steps: { images: Image[], date: Date }[] = [];
    // @ts-ignore
    userCollections: Collection[];
    images: Image[] = [];
    masonryOptions = {
        gutter: 20
    };

    constructor(
        private imageService: ImageService,
        private imageUtilService: ImageUtilService,
        private authService: AuthService,
        private collectionService: CollectionService,
        private dialog: MatDialog) {

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.batchImageRequest.batchSize = -1;
        this.batchImageRequest.requestFilter!.ownerId = this.user!.id;
        this.batchImageRequest.requestOrderByType = RequestOrderByType.TIME;
        this.collectionService.getCollectionsByUserId(this.user!.id).subscribe(value => {
            this.userCollections = value;
        });
        this.imageService.getImages(this.batchImageRequest).subscribe(images => {
            let startDate = images[0].uploaded;
            let tempImages: Image[] = [];
            for (let image of images) {
                if (new Date(image.uploaded).getTime() < new Date(startDate).getTime() + 604800000) {
                    tempImages.push(image);
                } else {
                    this.steps.push({images: tempImages, date: startDate});
                    tempImages = [];
                    startDate = image.uploaded;
                    tempImages.push(image);
                }
            }
            if (images) {
                this.steps.push({images: tempImages, date: startDate});
            }
        });
    }

    timelineStepClick(step: { images: Image[]; date: Date }) {
        this.images = step.images;
    }

    imageClicked(image: Image) {
        let dialogRef = this.dialog.open(ImageViewDialogComponent, {
            data: image,
            panelClass: 'panel-class',
            autoFocus: false,
        });
        let instance = dialogRef.componentInstance;
        instance!.deletedImageEvent.subscribe((deletedImage: Image) => {
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
        }).subscribe(value => instance!.images = value);

    }
}

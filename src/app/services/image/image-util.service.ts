import {Injectable} from '@angular/core';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {RequestOrderType} from '../../models/request/request-order-type';
import {RequestTagType} from '../../models/request/request-tag-type';
import {AuthService} from '../auth/auth.service';
import {Subject} from 'rxjs';
import {Image} from '../../models/image.model';

@Injectable({
    providedIn: 'root'
})
export class ImageUtilService {

    private _imageUploadSubject: Subject<Image> = new Subject<Image>();

    private _defaultBatchImageRequest: BatchImageRequest = {
        tags: [],
        batchSize: 24,
        pageCount: 0,
        requestFilter: {
            nameFilterString: null,
            maxCount: null,
            ownerId: null,
            fromDate: null,
            toDate: null,
            distance: null,
            latitude: null,
            longitude: null,
        },
        requestOrderByType: RequestOrderByType.ALPHABETICAL,
        requestOrderType: RequestOrderType.ASC,
        requestTagType: RequestTagType.OR,
        collectionId: null,
        requestUserId: this.authService.getCurrentUser().id,
        loadThumbnails: true,
    };

    constructor(private authService: AuthService) {
        this.authService.loginUserId.subscribe(value => {
            this.defaultBatchImageRequest.requestUserId = value;
        });
    }

    get defaultBatchImageRequest(): BatchImageRequest {
        return structuredClone(this._defaultBatchImageRequest);
    }


    get imageUploadSubject(): Subject<Image> {
        return this._imageUploadSubject;
    }

    getImageFilterValue(image: Image) {
        return 'grayscale(' + (image.properties['grayScale'] ? image.properties['grayScale'] : String(0))
            + ') sepia(' + (image.properties['sepia'] ? image.properties['sepia'] : String(0))
            + ') hue-rotate(' + (image.properties['hueRotate'] ? image.properties['hueRotate'] : String(0))
            + 'deg) saturate(' + (image.properties['saturate'] ? image.properties['saturate'] : String(1))
            + ') brightness(' + (image.properties['brightness'] ? image.properties['brightness'] : String(1))
            + ') blur(' + (image.properties['blur'] ? image.properties['blur'] : String(0))
            + 'px)';
    }
}

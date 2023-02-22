import {Injectable} from '@angular/core';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {RequestOrderType} from '../../models/request/request-order-type';
import {RequestTagType} from '../../models/request/request-tag-type';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ImageUtilService {

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
        },
        requestOrderByType: RequestOrderByType.ALPHABETICAL,
        requestOrderType: RequestOrderType.ASC,
        requestTagType: RequestTagType.OR,
        collectionId: null,
        requestUserId: this.authService.getCurrentUser().id,
    };

    constructor(private authService: AuthService) {
        this.authService.loginUserId.subscribe(value => {
            this.defaultBatchImageRequest.requestUserId = value;
        });
    }

    get defaultBatchImageRequest(): BatchImageRequest {
        return structuredClone(this._defaultBatchImageRequest);
    }
}

import {Injectable} from '@angular/core';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';
import {RequestOrderByType} from '../../models/request/request-order-by-type';
import {RequestOrderType} from '../../models/request/request-order-type';
import {RequestTagType} from '../../models/request/request-tag-type';

@Injectable({
    providedIn: 'root'
})
export class ImageUtilService {

    private _defaultBatchImageRequest: BatchImageRequest = {
        tags: [],
        batchSize: 24,
        pageCount: 0,
        requestFilter: null,
        requestOrderByType: RequestOrderByType.ALPHABETICAL,
        requestOrderType: RequestOrderType.ASC,
        requestTagType: RequestTagType.OR,
        collectionId: null,
    };

    private batchImageRequest: BatchImageRequest | null = null;

    constructor() {
    }

    setBatchImageRequest(batchImageRequest1: BatchImageRequest) {
        this.batchImageRequest = structuredClone(batchImageRequest1);
    }

    getBatchImageRequest() {
        let tempBatchImageRequest = structuredClone(this.batchImageRequest);
        this.batchImageRequest = null;
        return tempBatchImageRequest;

    }


    get defaultBatchImageRequest(): BatchImageRequest {
        return structuredClone(this._defaultBatchImageRequest);
    }
}

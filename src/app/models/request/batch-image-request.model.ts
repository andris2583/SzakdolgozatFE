import {RequestTagType} from './request-tag-type';
import {RequestOrderByType} from './request-order-by-type';
import {RequestOrderType} from './request-order-type';
import {RequestFilter} from './request-filter';

export interface BatchImageRequest {
    tags: (string | null)[];
    requestTagType: RequestTagType | null;
    requestOrderByType: RequestOrderByType | null;
    requestOrderType: RequestOrderType | null;
    batchSize: number;
    pageCount: number;
    requestFilter: RequestFilter | null;
    collectionId: string | null;
    requestUserId: string | null;
    loadThumbnails: boolean | null;
}

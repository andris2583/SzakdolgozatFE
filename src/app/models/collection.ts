import {CollectionType} from './collection-type';
import {Privacy} from './privacy';

export interface Collection {
    id: string;
    name: string;
    imageIds: string[];
    userId: string;
    privacy: Privacy;
    type: CollectionType;
}

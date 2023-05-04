import {Privacy} from './privacy';

export interface Image {
    id: string;
    name: string;
    extension: string;
    tags: string[];
    uploaded: Date;
    imgB64: string;
    properties: any;
    ownerId: string;
    privacy: Privacy;
}

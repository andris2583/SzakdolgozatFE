export interface Image {
    id: string;
    name: string;
    extension: string;
    location: string;
    tags: string[];
    uploaded: Date;
    imgB64: string;
    properties: Object;
}

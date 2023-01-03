import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../../services/image/image.service';
import {Image} from '../../../models/image.model';
import {RequestOrderByType} from '../../../models/request/request-order-by-type';
import {RequestOrderType} from '../../../models/request/request-order-type';
import {RequestTagType} from '../../../models/request/request-tag-type';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

    @Input()
    tagName: string = 'N/A';

    @Input()
    width: number = 0;

    @Input()
    height: number = 0;

    previewImages: Image[] = [];

    imageCount: number | null = null;

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.imageService.getImages({
            tags: [this.tagName],
            pageCount: 0,
            batchSize: 4,
            requestFilter: null,
            requestOrderByType: RequestOrderByType.ALPHABETICAL,
            requestOrderType: RequestOrderType.ASC,
            requestTagType: RequestTagType.OR
        }).subscribe(value => {
            this.previewImages = value;
        });
        this.imageService.getImageCountWithTag(this.tagName).subscribe(value => {
            this.imageCount = Math.max(0, value - 4);
        });
    }


    getPreviewImage(index: number): string | null {
        if (this.previewImages.length < index + 1) {
            return this.previewImages[index % this.previewImages.length].imgB64;
        } else {
            return this.previewImages[index].imgB64;
        }

    }

    getTagNameFontSize() {
        return Math.max((this.height * 0.0625), 14);
    }
}

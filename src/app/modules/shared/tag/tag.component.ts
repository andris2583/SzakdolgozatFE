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

    previewImages: Image[] = [];

    imageCount: number = 0;

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.imageService.getImages({
            tags: [this.tagName],
            pageCount: 0,
            batchSize: 4,
            requestFilter: null,
            requestOrderByType: RequestOrderByType.RANDOM,
            requestOrderType: RequestOrderType.ASC,
            requestTagType: RequestTagType.OR,
            collectionId: null
        }).subscribe(value => {
            this.previewImages = value;
        });
        this.imageService.getImageCountWithTag(this.tagName).subscribe(value => {
            this.imageCount = Math.max(0, value - 4);
        });
    }


    getPreviewImage(index: number): Image {
        if (this.previewImages.length < index + 1) {
            return this.previewImages[index % this.previewImages.length];
        } else {
            return this.previewImages[index];
        }

    }

    getTagNameFontSize() {
        return Math.max((this.width * 1.08 * 0.0625), 14);
    }

    shouldImageBeBlurred(number: number) {
        return this.previewImages.length <= number;
    }
}

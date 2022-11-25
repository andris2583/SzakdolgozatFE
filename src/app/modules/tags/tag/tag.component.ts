import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../../services/image/image.service';
import {Image} from '../../../models/image.model';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

    @Input()
    tagName: string = 'N/A';

    previewImages: Image[] = [];

    imageCount: number | null = null;

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.imageService.getImages({tag: this.tagName, pageCount: 0, batchSize: 4}).subscribe(value => {
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
}

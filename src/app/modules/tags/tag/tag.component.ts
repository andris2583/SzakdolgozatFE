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

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.imageService.getImages({tag: this.tagName, pageCount: 0, batchSize: 4}).subscribe(value => {
            this.previewImages = value;
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

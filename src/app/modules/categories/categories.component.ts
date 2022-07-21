import {Component, OnInit, ViewChildren} from '@angular/core';
import {ThumbnailService} from "../../services/thumbnail/thumbnail.service";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Thumbnail} from "../../models/thumbnail.model";
import {Image} from "../../models/image.model";
import {ImageService} from "../../services/image/image.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
              private thumbnailService: ThumbnailService,
              private imageService: ImageService,
              private http: HttpClient,
              private sanitizer: DomSanitizer
  ) { }


  thumbnails: Thumbnail[] = []

  images: Image[] = [];

  showFullPreviewImage = false;
  fullPreviewImagePath: SafeResourceUrl = "";
  previewImageLeft = 0;
  previewImageTop = 0;

  // @ViewChildren("previewImage")
  // previewImage: HTMLElement | undefined

  ngOnInit(): void {
    this.thumbnailService.getAllThumbnails().subscribe(value => {
      this.thumbnails = value;
    })
    this.imageService.getAllImages().subscribe(value => {
      this.images = value;
    })
  }

  sanitizeImage(imgB64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + imgB64);
  }

  showFullImage(imageID: string,event: MouseEvent) {
    let currentImage = this.images.filter(image => {
      return image.id == imageID;
    })[0];

    // @ts-ignore
    this.previewImageLeft = Math.round(event.target.getBoundingClientRect().x-75);
    // @ts-ignore
    this.previewImageTop = Math.round(event.target.getBoundingClientRect().y-75);

    this.fullPreviewImagePath = this.sanitizeImage(currentImage.imgB64);
    this.showFullPreviewImage = true;
  }

  hideFullImage() {
    this.showFullPreviewImage = false;
  }
}

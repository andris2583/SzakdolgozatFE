import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {ThumbnailService} from "../../services/thumbnail/thumbnail.service";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Thumbnail} from "../../models/thumbnail.model";
import {Image} from "../../models/image.model";
import {ImageService} from "../../services/image/image.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewDialogComponent} from "./image-view-dialog/image-view-dialog.component";


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
              public dialog: MatDialog
  ) { }


  thumbnails: Thumbnail[] = []

  imageToUpload: Image = {} as Image;

  // @ViewChildren("previewImage")
  // previewImage: HTMLElement | undefined

  ngOnInit(): void {
    this.thumbnailService.getAllThumbnails().subscribe(value => {
      this.thumbnails = value;
    })

  }

  openImageViewDialog(imageID: string) {
    this.imageService.getById(imageID).subscribe(value => {
      this.dialog.open(ImageViewDialogComponent, {
        data: value,
        panelClass: 'panel-class'
      });
    });
  }

  handleFileInput(event: Event) {
    // @ts-ignore
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = () => {
        this.imageToUpload.imgB64 = (reader.result as string).replace('data:image/jpeg;base64,','');
        // @ts-ignore
        this.imageToUpload.name = event.target.files[i].name
        this.imageToUpload.location = 'Kecskemét'
        this.imageToUpload.categories = []
        this.uploadImageButtonClick()
      };
    }

  }

  uploadImageButtonClick(){
    this.imageService.insertImage(this.imageToUpload).subscribe(image => {
      this.thumbnailService.getAllThumbnails().subscribe(thumbnails => {
        this.thumbnails=thumbnails;
      })
    })
  }

}

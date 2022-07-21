import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {ThumbnailService} from "../../services/thumbnail/thumbnail.service";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Thumbnail} from "../../models/thumbnail.model";
import {Image} from "../../models/image.model";
import {ImageService} from "../../services/image/image.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewDialogComponent} from "./image-view-dialog/image-view-dialog.component";
import {ImageUtilService} from "../../services/image/image-util.service";


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
              public imageUtilService: ImageUtilService,
              public dialog: MatDialog
  ) { }


  thumbnails: Thumbnail[] = []


  // @ViewChildren("previewImage")
  // previewImage: HTMLElement | undefined

  ngOnInit(): void {
    this.thumbnailService.getAllThumbnails().subscribe(value => {
      this.thumbnails = value;
      this.openImageViewDialog("62d96b71f33d4118925b5f2e");

    })
  }

  openImageViewDialog(imageID: string) {
    this.imageService.getById(imageID).subscribe( value => {
      if(value!=null){
        this.dialog.open(ImageViewDialogComponent, {
          data: value,
          panelClass: 'panel-class'
        });
      }else{
        console.log("Failed to load image!")
      }
    });

  }

}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Image} from "../../../models/image.model";
import {ImageService} from "../../../services/image/image.service";
import {Thumbnail} from "../../../models/thumbnail.model";
import {ThumbnailService} from "../../../services/thumbnail/thumbnail.service";

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public image: Image,
    public dialogRef: MatDialogRef<any>,
    private imageService: ImageService,
    private thumbnailService: ThumbnailService
  ) { }


  thumbnails: Thumbnail[] = [];

  // @ts-ignore
  leftImage: Image;
  // @ts-ignore
  rightImage: Image;

  loading: boolean = false;

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%');
    // @ts-ignore
    let id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id))-1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.leftImage = value;
    })
    // @ts-ignore
    id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id))+1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.rightImage = value;
    })
  }

  downloadButtonClick(){
    // const downloadLink = document.createElement('a');
    // const fileName = this.image.name;
    //
    // downloadLink.href = this.image.imgB64;
    // downloadLink.download = fileName;
    // downloadLink.click();
  }

//TODO current id 0 v. max akkor felt/right meghal
  goLeft() {
    this.loading=true;
    this.rightImage = this.image;
    this.image = this.leftImage;
    // @ts-ignore
    let id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id))-1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.leftImage = value;
    })
  }

  async goRight() {
    this.loading = true;
    this.leftImage = this.image;
    this.image = this.rightImage;
    // @ts-ignore
    let id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id)) + 1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.rightImage = value;
    })
  }

  onLoad(){
    this.loading=false;
  }

  deleteImage(){
    this.imageService.deleteImage(this.image).subscribe(value => {
      this.thumbnailService.getAllThumbnails().subscribe(thumbnails => {
        this.thumbnails=thumbnails;
      })
    });
    this.dialogRef.close();
  }

}

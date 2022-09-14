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

  loading: boolean = true;

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%');
  }

  downloadButtonClick(){
    this.imageService.getImageData(this.image).subscribe(value => {
      const url = URL.createObjectURL(value);
      const a: any = document.createElement('a');
      a.href = url;
      a.download = this.image.name;
      document.body.appendChild(a);
      a.style = 'display: none';
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
  }

  goLeft() {
    this.loading=true;
    // @ts-ignore
    let id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id))-1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.image = value;
    })
  }

  goRight() {
    this.loading = true;
    // @ts-ignore
    let id = this.thumbnails.indexOf(this.thumbnails.find(t => t.imageID == this.image.id)) + 1
    this.imageService.getById(this.thumbnails[id].imageID).subscribe(value => {
      this.image = value;
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

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Image} from "../../../models/image.model";

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public image: Image,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%');
  }

  downloadButtonClick(){
    // const downloadLink = document.createElement('a');
    // const fileName = this.image.name;
    //
    // downloadLink.href = this.image.imgB64;
    // downloadLink.download = fileName;
    // downloadLink.click();
  }




}

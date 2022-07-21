import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Image} from "../../../models/image.model";
import {ImageUtilService} from "../../../services/image/image-util.service";

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public image: Image,
    public imageUtilService: ImageUtilService,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%');
  }


}

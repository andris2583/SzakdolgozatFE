import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Image} from "../../models/image.model";
import {ImageService} from "../../services/image/image.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewDialogComponent} from "./image-view-dialog/image-view-dialog.component";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor(
              private imageService: ImageService,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute
  ) { }


  images: Image[] = []

  imageToUpload: Image = {} as Image;

  categoryName: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => {
        this.imageService.getAllImages().subscribe(value => {
          this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
          if(this.categoryName != 'all'){
            // @ts-ignore
            this.images = value.filter(value1 => value1.categories.includes(this.categoryName));
          }else{
            this.images = value;
          }
        })      }

    );


  }

  openImageViewDialog(image: Image) {
      let dialogRef = this.dialog.open(ImageViewDialogComponent, {
        data: image,
        panelClass: 'panel-class'
      });
      let instance = dialogRef.componentInstance;
      instance.images = this.images;
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
      this.imageService.getAllImages().subscribe(images => {
        this.images=images;
      })
    })
  }

}

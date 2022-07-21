import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor(
    private sanitizer: DomSanitizer,

  ) { }

  sanitizeImage(imgB64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + imgB64);
  }

  getNoExtensionName(name: string): string{
    return name.split('.')[0];
  }
}

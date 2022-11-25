import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeImage'
})
export class SanitizeImagePipe implements PipeTransform {

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    transform(imgB64: string | null): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + imgB64);
    }

}

@Pipe({
    name: 'getNoExtensionName'
})
export class GetNoExtensionNamePipe implements PipeTransform {

    transform(name: string): string {
        return name.split('.')[0];
    }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GetNoExtensionNamePipe, SanitizeImagePipe} from '../../../services/image/image-util.pipe';


@NgModule({
    declarations: [
        SanitizeImagePipe,
        GetNoExtensionNamePipe
    ],
    imports: [
        CommonModule
    ],
    providers: [
        SanitizeImagePipe,
        GetNoExtensionNamePipe
    ],
    exports: [
        SanitizeImagePipe,
        GetNoExtensionNamePipe
    ]
})
export class PipeModule {
}

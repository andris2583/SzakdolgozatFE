import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Image} from '../../../models/image.model';
import {CollectionService} from '../../../services/collection/collection.service';
import {Collection} from '../../../models/collection';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-collection-manager-dialog',
    templateUrl: './collection-manager-dialog.component.html',
    styleUrls: ['./collection-manager-dialog.component.scss']
})
export class CollectionManagerDialogComponent implements OnInit {

    collections: Collection[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private collectionsService: CollectionService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
    }

}

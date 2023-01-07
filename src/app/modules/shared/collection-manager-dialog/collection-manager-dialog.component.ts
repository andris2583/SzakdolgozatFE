import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Image} from '../../../models/image.model';
import {CollectionService} from '../../../services/collection/collection.service';
import {Collection} from '../../../models/collection';
import {AuthService} from '../../../services/auth/auth.service';
import {Privacy} from '../../../models/privacy';
import {CollectionType} from '../../../models/collection-type';

@Component({
    selector: 'app-collection-manager-dialog',
    templateUrl: './collection-manager-dialog.component.html',
    styleUrls: ['./collection-manager-dialog.component.scss']
})
export class CollectionManagerDialogComponent implements OnInit {

    collections: Collection[] = [];
    isCreatingNewCollection: boolean = false;
    newCollectionName: string = '';
    newCollectionPrivacy: Privacy = Privacy.PRIVATE;
    privacyOptions = Privacy;
    @Output()
    collectionsChanged = new EventEmitter<Collection[]>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public image: Image,
        public dialogRef: MatDialogRef<any>,
        private collectionsService: CollectionService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
    }

    startNewCollectionCreation() {
        this.isCreatingNewCollection = true;
    }

    createNewCollection() {
        if (this.newCollectionName != '') {
            this.isCreatingNewCollection = false;
            let newCollection = {} as Collection;
            newCollection.name = this.newCollectionName;
            newCollection.imageIds = [];
            newCollection.type = CollectionType.CUSTOM;
            newCollection.userId = this.authService.getCurrentUser().id;
            newCollection.privacy = this.newCollectionPrivacy;
            this.collectionsService.insertCollection(newCollection).subscribe(value => {
                this.collections.push(value);
            });
            this.newCollectionName = '';
            this.newCollectionPrivacy = Privacy.PRIVATE;
        }
    }

    collectionCheckBoxClicked(collection: Collection) {
        this.collectionsService.saveToCollection(this.authService.getCurrentUser().id, collection.id, this.image.id).subscribe(value => {
            if (value != null) {
                this.collections.forEach(tempCollection => {
                    if (tempCollection.id == collection.id) {
                        tempCollection.imageIds = value.imageIds;
                    }
                });
                this.collectionsChanged.emit(this.collections);
            }
        });
    }
}

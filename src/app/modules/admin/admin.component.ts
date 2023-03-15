import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {ImageService} from '../../services/image/image.service';
import {CollectionService} from '../../services/collection/collection.service';
import {Image} from '../../models/image.model';
import {Collection} from '../../models/collection';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(private authService: AuthService, private imageService: ImageService, private collectionService: CollectionService) {
    }

    users: Observable<User[]> = this.authService.getAllUsers();
    userDisplayedColumns: string[] = ['Name', 'Email', 'Roles', 'Subscription', 'Actions'];
    images: Observable<Image[]> = this.imageService.getAllImages();
    imageDisplayedColumns: string[] = ['Link', 'Name', 'Uploaded', 'Tags', 'Owner', 'Privacy', 'Actions'];
    collections: Observable<Collection[]> = this.collectionService.getAllCollections();
    collectionDisplayedColumns: string[] = ['Name', 'Owner', 'Images', 'Privacy', 'Type', 'Actions'];

    ngOnInit(): void {
    }

    saveCollection(collection: Collection) {
        this.collectionService.saveCollection(collection).subscribe(() => {
        });
    }

    saveUser(user: User) {
        this.authService.updateUser(user).subscribe(() => {
        });
    }

    sameImage(image: Image) {
        this.imageService.updateImage(image).subscribe(() => {
        });
    }
}

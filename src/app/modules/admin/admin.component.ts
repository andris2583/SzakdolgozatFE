import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {ImageService} from '../../services/image/image.service';
import {CollectionService} from '../../services/collection/collection.service';
import {Image} from '../../models/image.model';
import {Collection} from '../../models/collection';
import {Privacy} from '../../models/privacy';
import {SubscriptionType} from '../../models/request/subscription-type';
import {CollectionType} from '../../models/collection-type';
import {UserRole} from '../../models/user-role.model';

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
    privacyOptions: Privacy[] = [Privacy.PUBLIC, Privacy.PRIVATE];
    subscriptionOptions: SubscriptionType[] = [SubscriptionType.FREE, SubscriptionType.PRO];
    collectionTypeOptions: CollectionType[] = [CollectionType.FAVOURITE, CollectionType.CUSTOM];
    roleOptions: Observable<UserRole[]> = this.authService.getAllRoles();

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

    saveImage(image: Image) {
        this.imageService.updateImage(image).subscribe(() => {
        });
    }

    deleteCollection(collection: Collection) {
        this.collectionService.deleteCollection(collection).subscribe(() => {
            this.collections = this.collectionService.getAllCollections();
        });
    }

    deleteImage(image: Image) {
        this.imageService.deleteImage(image).subscribe(() => {
            this.images = this.imageService.getAllImages();
        });
    }

    hasRole(user: User, role: UserRole) {
        return user.roles.filter(role => role).map(role => role.name).includes(role.name);
    }

    roleCheckboxClicked($event: any, role: UserRole, user: User) {
        if ($event.checked) {
            // @ts-ignore
            user.roles.push({id: null, name: role.name});
        } else {
            user.roles = user.roles.filter(tempRole => tempRole && tempRole.name != role.name);
        }
        this.saveUser(user);

    }
}

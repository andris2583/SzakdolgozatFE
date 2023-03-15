import {SubscriptionType} from './request/subscription-type';
import {UserRole} from './user-role.model';

export class User {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    subscriptionType!: SubscriptionType;
    roles!: UserRole[];
}

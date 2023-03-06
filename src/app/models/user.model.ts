import {SubscriptionType} from './request/subscription-type';

export class User {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    subscriptionType!: SubscriptionType;
}

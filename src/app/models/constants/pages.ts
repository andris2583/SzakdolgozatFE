import {Page} from '../page.model';

export class Pages {
    public readonly pages: Page[] = [
        {route: '/dashboard', name: 'Dashboard', protected: true},
        {route: '/images/all', name: 'Images', protected: true},
        {route: '/categories', name: 'Categories', protected: true},
        {route: '/login', name: 'Login', protected: false},
        {route: '/register', name: 'Register', protected: false},
    ];
}

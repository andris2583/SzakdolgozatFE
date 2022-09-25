import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public pages: { route: string, name: string }[] = [
        {route: '/dashboard', name: 'Dashboard'},
        {route: '/images/all', name: 'Images'},
        {route: '/tags', name: 'Tags'},
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}

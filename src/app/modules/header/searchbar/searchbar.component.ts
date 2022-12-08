import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({height: 0, opacity: 1}),
                        animate('150ms ease-out',
                            style({height: '*', opacity: 1}))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({height: '*', opacity: 1}),
                        animate('150ms ease-in',
                            style({height: 0, opacity: 1}))
                    ]
                )
            ]
        )
    ]
})
export class SearchbarComponent implements OnInit {

    constructor() {
    }

    searchbarInFocus: boolean = false;

    searchbarValue: string = '';

    ngOnInit(): void {
    }

    onSearchFocus() {
        this.searchbarInFocus = true;
    }

    onSearchBlur() {
        this.searchbarInFocus = false;
        this.searchbarValue = '';
    }

    onKeyUp($event: KeyboardEvent) {
    }

    onKeyDown($event: KeyboardEvent) {
        if ($event.code == 'Escape') {
            this.onSearchBlur();
            this.searchbarValue = '';
            let form = document.getElementById('search-input');
            form?.blur();
        }
    }
}

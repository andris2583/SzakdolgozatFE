import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {TagService} from '../../../services/tag/tag.service';
import {Tag} from '../../../models/tag.model';

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

    @ViewChild('searchbarContainer') searchbarContainer: ElementRef | undefined;
    @ViewChild('dropdownMenu') dropdownMenu: ElementRef | undefined;


    allTags: Tag[] = [];
    suggestions: Tag[] = [];

    searchbarInFocus: boolean = false;

    searchbarValue: string = '';
    tagWidth: number = 100;

    constructor(private tagService: TagService, private renderer: Renderer2
    ) {
        this.renderer.listen('window', 'click', (event) => {
            if (this.searchbarContainer != undefined) {
                if (event.target != this.searchbarContainer.nativeElement && !this.searchbarContainer.nativeElement.contains(event.target)) {
                    this.onSearchBlur();
                }
            }
            //TODO fix this
            if (this.dropdownMenu != undefined) {
                if (this.dropdownMenu?.nativeElement.contains(event.target)) {
                    setTimeout(() => this.onSearchBlur(), 10);
                }
            }
        });
    }

    ngOnInit(): void {
        this.tagService.getAllTags().subscribe(tags => {
            this.allTags = tags;
            this.suggestions = [];
        });
    }

    onSearchFocus() {
        this.searchbarInFocus = true;
    }

    onSearchBlur() {
        this.searchbarInFocus = false;
        this.searchbarValue = '';
        this.suggestions = [];
    }

    onKeyUp($event: KeyboardEvent) {
    }

    onEscape() {
        this.onSearchBlur();
        this.searchbarValue = '';
        let form = document.getElementById('search-input');
        form?.blur();
        this.suggestions = [];
    }

    onInput() {
        if (this.searchbarValue == '') {
            this.suggestions = [];
        } else {
            this.suggestions = this.allTags.filter(tempTag => tempTag.name.toLowerCase().startsWith(this.searchbarValue.toLowerCase())).slice(0, 10);
        }
    }
}

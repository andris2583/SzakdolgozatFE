import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {TagService} from '../../../../services/tag/tag.service';
import {Image} from '../../../../models/image.model';
import {ImageService} from '../../../../services/image/image.service';
import {Tag} from '../../../../models/tag.model';

@Component({
    selector: 'app-image-tag-list',
    templateUrl: './image-tag-list.component.html',
    styleUrls: ['./image-tag-list.component.scss']
})
export class ImageTagListComponent implements OnInit, OnChanges {

    @Input()
    image: Image | null = null;
    tagSearch = new FormControl('');
    allTags: Tag[] = [];
    suggestions: string[] = [];
    filteredSuggestions: Observable<string[]> = new Observable<string[]>();

    constructor(private tagService: TagService, private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.init();
    }

    ngOnChanges() {
        this.init();
    }

    init() {
        this.tagService.getAllTags().subscribe(tags => {
            this.allTags = tags;
            this.suggestions = this.allTags
                .map(tempTag => tempTag.name)
                .filter(tempTag => !this.image!.tags.includes(tempTag));
        });
        this.filteredSuggestions = this.tagSearch.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value || '')),
        );
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(filterValue));
    }

    addTag(value: string | null) {
        if (value == null) {
            value = this.tagSearch.value;
        }
        if (this.suggestions.includes(value as string)) {
            this.image?.tags.push(value as string);
            this.tagSearch.reset();
            if (this.image != null) {
                this.imageService.updateImage(this.image).subscribe(updatedImage => this.image = updatedImage);
                this.suggestions = this.allTags
                    .map(tempTag => tempTag.name)
                    .filter(tempTag => !this.image!.tags.includes(tempTag));
            }
        }
    }

    deleteTag(tagToDelete: string) {
        if (this.image != null) {
            this.image!.tags = this.image?.tags.filter(tempTag => tempTag != tagToDelete);
            this.imageService.updateImage(this.image).subscribe(updatedImage => this.image = updatedImage);
            this.suggestions = this.allTags
                .map(tempTag => tempTag.name)
                .filter(tempTag => !this.image!.tags.includes(tempTag));
        }
    }
}

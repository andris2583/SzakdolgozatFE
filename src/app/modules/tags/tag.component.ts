import {Component, OnInit} from '@angular/core';
import {TagService} from '../../services/tag/tag.service';
import {Tag} from '../../models/tag.model';

@Component({
    selector: 'app-tags',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

    public tags: Tag[] = [];

    constructor(
        private tagService: TagService
    ) {
    }

    ngOnInit(): void {
        this.tagService.getAllTags().subscribe(tags => {
            this.tags = tags;
        });
    }

}
